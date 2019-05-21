/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import './App.css';
import oilList from './data/oilList';
import SelectRow from './components/SelectRow';
import base from './base/base';

class App extends Component {
    constructor(props) {

        super(props);

        this.defaultOilData = {
            name: '',
            enName: '',
            // 皂化價
            saponificationValue: null,
            INS: null,
            // 碘價
            iodineValue: null,
            // 建議％
            suggestPercentage: '',
            // 特徵
            feature: '',
        };

        this.defaultOilRowData = {
            oilData: this.defaultOilData,
            oilPercentage: '',
            oilGram: '',
        };

        this.state = {
            soapName: '',

            oilLists: [
                {...this.defaultOilRowData},
                {...this.defaultOilRowData},
                {...this.defaultOilRowData},
            ],

            // 總油重
            totalOilGram: 700,
            // 成品皂的INS
            totalINS: 0,
            // 總油％
            totalPercentage: 0,

            // 總NaOH重
            totalNaOHGram: 0,
            // 水的倍數
            waterTimes: 0,
            // 總水重
            totalWaterGram: 0,

            // 總精油%
            essentialOilPercentage: null,
            // 總精油%cc
            totalEssentialOilcc: null,

            // 添加物
            additives: [],
        };

        const d = new Date(),
            year = d.getFullYear(),
            month = `0${d.getMonth() + 1}`.substr(-2),
            date = `0${d.getDate()}`.substr(-2);
        this.today = [year, month, date].join('-'); 

    }

    calcTotal = async () => {

        let totalNaOHGram = 0,
            totalINS = 0,
            totalWaterGram = 0,
            totalPercentage = 0;

        await this.state.oilLists.forEach((oil) => {

            if (oil.oilData.saponificationValue) {

                totalNaOHGram = base.calc(base.strip(totalNaOHGram + (this.state.totalOilGram * (oil.oilPercentage || 0) / 100 * oil.oilData.saponificationValue)), 2);

            }

            if (oil.oilData.INS) {

                totalINS = base.calc(base.strip(totalINS + ((oil.oilPercentage || 0) / 100 * oil.oilData.INS)), 2);

            }

            totalPercentage = base.calc(base.strip(totalPercentage + (oil.oilPercentage || 0)), 0);
            
        });

        totalWaterGram = base.strip(totalNaOHGram * this.state.waterTimes);

        totalNaOHGram = base.isNaNToZero(totalNaOHGram);
        totalINS = base.isNaNToZero(totalINS);
        totalWaterGram = base.isNaNToZero(totalWaterGram);
        totalPercentage = base.isNaNToZero(totalPercentage);

        this.setState({
            totalNaOHGram,
            totalINS,
            totalWaterGram,
            totalPercentage,
        });

    }

    updateOilLists = (newOilLists) => {

        this.setState({
            oilLists: newOilLists
        }, () => {

            this.calcTotal();

        });

    }

    handleSelfInputChange = (e) => {

        this.setState({ [e.target.id]: e.target.value });

    }

    handleInputChange = (e) => {

        let newOilLists = [].concat(this.state.oilLists);
        newOilLists.forEach((oil) => {
            oil.oilGram = base.calc(base.strip(e.target.value * (oil.oilPercentage || 0) / 100), 0);
        });

        this.setState({ [e.target.id]: e.target.value }, () => {

            this.updateOilLists(newOilLists);

        });

    }

    handleOilSelect = (e) => {

        const rowIndex = e.target.dataset.rowIndex;
        const value = e.target.value;
        const selectedOil = [].concat(oilList).find((oil) => oil.enName === value);
        let newOilLists = [].concat(this.state.oilLists);
        newOilLists[rowIndex].oilData = selectedOil;

        this.updateOilLists(newOilLists);
    
    }

    handleOilPercentageChange = (e) => {

        const rowIndex = e.target.dataset.rowIndex,
            totalOilWeight = this.state.totalOilGram;
        let newOilLists = [].concat(this.state.oilLists);
        newOilLists[rowIndex].oilPercentage = (e.target.value === '') ? '' : +e.target.value;
        newOilLists[rowIndex].oilGram = (e.target.value === '') ? '' : base.strip(totalOilWeight * (+e.target.value) / 100);

        this.updateOilLists(newOilLists);

    }

    handleOilGramChange = async (e) => {

        e.persist();

        const rowIndex = e.target.dataset.rowIndex;
        let newOilLists = [].concat(this.state.oilLists),
            totalOilWeight = 0;

        newOilLists[rowIndex].oilGram = (e.target.value === '') ? '' : +e.target.value;
        await newOilLists.forEach((oil) => {
            totalOilWeight = base.calc(base.strip(totalOilWeight + (oil.oilGram || 0)), 0);
        });
        await newOilLists.forEach((oil) => {
            oil.oilPercentage = base.calc(base.strip((oil.oilGram || 0) / totalOilWeight * 100), 0);
        });

        // if (+e.target.value > 0) {

            this.setState({
                totalOilGram: (totalOilWeight <= 0) ? 700 : totalOilWeight,
            }, () => {

                this.updateOilLists(newOilLists);

            });

        // }

    }

    handleDeleteRow = (e) => {

        const rowIndex = e.target.dataset.rowIndex;
        let newOilLists = [].concat(this.state.oilLists);
        newOilLists.splice(rowIndex, 1);

        this.updateOilLists(newOilLists);

    }

    handleAddOil = () => {

        let newOilLists = [].concat(this.state.oilLists);
        newOilLists = newOilLists.concat([{...this.defaultOilRowData}]);

        this.updateOilLists(newOilLists);

    }

    handleWaterTimesInputChange =(e) => {

        const waterTimesValue = e.target.value;
        this.setState({
            waterTimes: +waterTimesValue,
            totalWaterGram: base.strip(waterTimesValue * this.state.totalNaOHGram)
        });

    }

    doTableRow = (oilData, selectedOilArray) => {

        return (

            selectedOilArray.map((oil, rowIndex) => (

                <SelectRow key={rowIndex}
                    oils={oilData}
                    oilPercentage={oil.oilPercentage}
                    data={oil}
                    oilGram={oil.oilGram}
                    saponificationValue={oil.oilData.saponificationValue}
                    INS={oil.oilData.INS}
                    suggestPercentage={oil.oilData.suggestPercentage}
                    defaultValue={oil.oilData.enName}
                    index={rowIndex}
                    totalOilGram={this.state.totalOilGram}
                    totalPercentage={this.state.totalPercentage}
                    handleOilSelect={this.handleOilSelect}
                    handleOilPercentageChange={this.handleOilPercentageChange}
                    handleDeleteRow={this.handleDeleteRow}
                    handleOilGramChange={this.handleOilGramChange}
                />

            ))

        )

    }

    render() {
        return (
            <div className="App">
                <h1>
                    <input
                        type="text"
                        onChange={this.handleSelfInputChange}
                        id="soapName"
                        value={this.state.soapName}
                        className="soapName"
                    />
                    <input
                        type="date"
                        onChange={this.handleSelfInputChange}
                        id="date"
                        value={this.state.date || this.today}
                        className="date"
                    />
                </h1>
                <ul className="topInfo">
                    <li>
                      預計製作總油量：
                      <input
                        type="number"
                        onChange={this.handleInputChange}
                        id="totalOilGram"
                        value={this.state.totalOilGram}
                      />
                      &nbsp;g
                    </li>
                    <li>
                        <div className="addRowBtnArea">
                            <a
                                href="javascript:;"
                                onClick={this.handleAddOil}
                            >Add Oil</a>
                        </div>
                    </li>
                </ul>
                <div className="tableArea">
                    <ul className="tableHead">
                        <li>油品（建議%)</li>
                        <li>INS</li>
                        <li>皂化價</li>
                        <li>x&nbsp;oil(g)</li>
                        <li>=&nbsp;NaOH(g)</li>
                        <li>oil(%)</li>
                        <li>Calc. INS</li>
                        <li>刪除</li>
                    </ul>
                    <div className="tableBody">
                        {this.doTableRow(oilList, this.state.oilLists)}
                    </div>
                    <ul className="tableFooter">
                        <li>Total</li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li>{this.state.totalNaOHGram}</li>
                        <li>{this.state.totalPercentage}&nbsp;%</li>
                        <li>{this.state.totalINS}</li>
                        <li></li>
                    </ul>
                </div>
                <ul className="bottomInfo">
                    <li>
                        水重量：&nbsp;<span>{base.calc(this.state.totalWaterGram, 2)}</span>&nbsp;g
                        &nbsp;（&nbsp;
                        <input
                            type="number"
                            onChange={this.handleWaterTimesInputChange}
                            id="waterTimes"
                            className="waterTimes"
                        />
                        &nbsp;倍&nbsp;）
                    </li>
                    <li>
                        45%鹼水需要量：&nbsp;<span>{base.calc(base.strip(this.state.totalNaOHGram / 0.45), 0)}</span>&nbsp;g
                    </li>
                    <li>
                        尚須水量：&nbsp;<span>{base.calc(base.strip(this.state.totalWaterGram - ((this.state.totalNaOHGram / 0.45) * 0.55)), 0)}</span>&nbsp;g
                    </li>
                </ul>
            </div>
        );
    }
}

export default App;
