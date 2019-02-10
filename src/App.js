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
            oilPercentage: 0,
        };

        this.state = {
            oilLists: [
                {...this.defaultOilRowData},
                {...this.defaultOilRowData},
                {...this.defaultOilRowData},
            ],

            // 總油重
            totalOilGram: 700,
            // 成品皂的INS
            totalINS: 0,

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

    }

    calcTotal = async () => {

        let totalNaOHGram = 0,
            totalINS = 0,
            totalWaterGram = 0;

        await this.state.oilLists.forEach((oil) => {

            if (oil.oilData.saponificationValue) {

                totalNaOHGram = base.strip(totalNaOHGram + (this.state.totalOilGram * oil.oilPercentage / 100 * oil.oilData.saponificationValue));

            }

            if (oil.oilData.INS) {

                totalINS = base.strip(totalINS + (oil.oilPercentage / 100 * oil.oilData.INS));

            }
            
        });

        totalWaterGram = base.strip(totalNaOHGram * this.state.waterTimes);

        this.setState({
            totalNaOHGram,
            totalINS,
            totalWaterGram
        });

    }

    updateOilLists = (newOilLists) => {

        this.setState({
            oilLists: newOilLists
        }, () => {

            this.calcTotal();

        });

    }

    handleInputChange = (e) => {

        this.setState({ [e.target.id]: e.target.value });

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

        const rowIndex = e.target.dataset.rowIndex;
        let newOilLists = [].concat(this.state.oilLists);
        newOilLists[rowIndex].oilPercentage = +e.target.value;

        this.updateOilLists(newOilLists);

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
                    defaultValue={oil.oilData.enName}
                    index={rowIndex}
                    totalOilGram={this.state.totalOilGram}
                    handleOilSelect={this.handleOilSelect}
                    handleOilPercentageChange={this.handleOilPercentageChange}
                    handleDeleteRow={this.handleDeleteRow}
                />

            ))

        )

    }

    render() {
        return (
            <div className="App">
                <ul className="topInfo">
                    <li>
                      預計製作總油量：
                      <input
                        type="text"
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
                        <li></li>
                        <li>{this.state.totalINS}</li>
                        <li></li>
                    </ul>
                </div>
                <ul className="bottomInfo">
                    <li>
                        水重量：&nbsp;<span>{this.state.totalWaterGram}</span>&nbsp;g
                        &nbsp;（&nbsp;
                        <input
                            type="number"
                            onChange={this.handleWaterTimesInputChange}
                            id="waterTimes"
                            className="waterTimes"
                        />
                        &nbsp;倍&nbsp;）
                    </li>
                </ul>
            </div>
        );
    }
}

export default App;
