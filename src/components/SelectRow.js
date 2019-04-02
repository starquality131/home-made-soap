/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-filename-extension */
import React, { PureComponent, Fragment } from 'react';
import '../css/SelectRow.scss';
import base from '../base/base';

class SelectRow extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            usePercentage: '',
            // 使用的油品g數
            useOilGram: '',
            // 需要的ＮaOHg數
            NaOHGram: '',
        };
    }

    doOilOptions = (data) => (

        data.map((oil, oilOptionIndex) => (

            <option 
                value={oil.enName} 
                key={oilOptionIndex}
                data-index={oilOptionIndex}
            >
                {oil.name}
            </option>

        ))

    )

    calculation = () => {}

    render() {

        return (
            <ul className="tableRow">
                <li className="tableCol oil_select">
                    <select 
                        id="oilName"
                        onChange={this.props.handleOilSelect}
                        value={this.props.defaultValue}
                        data-row-index={this.props.index}
                    >
                        {(this.props.defaultValue === '') ? (
                            <option value="">請選擇</option>
                        ) : null}
                        {this.doOilOptions(this.props.oils)}
                    </select>
                    {(this.props.defaultValue !== '') ? (
                        <Fragment>
                            &nbsp;<span>({this.props.data.oilData.suggestPercentage})</span>
                        </Fragment>
                    ) : null}
                </li>
                {/*INS*/}
                <li className="tableCol">{this.props.data.oilData.INS}</li>
                {/*皂化價*/}
                <li className="tableCol">{this.props.data.oilData.saponificationValue}</li>
                {/*oil g*/}
                <li className="tableCol oil_gram">
                    <input
                        type="number"
                        data-row-index={this.props.index}
                        onChange={this.props.handleOilGramChange}
                        value={this.props.data.oilGram}
                    />&nbsp;g
                </li>
                {/*NaOH g*/}
                <li className="tableCol">
                    {base.calc(base.strip(this.props.totalOilGram * this.props.data.oilPercentage / 100 * this.props.data.oilData.saponificationValue), 2)}
                </li>
                {/*oil %*/}
                <li className="tableCol oil_percentage">
                    <input
                        type="number"
                        data-row-index={this.props.index}
                        onChange={this.props.handleOilPercentageChange}
                        value={this.props.data.oilPercentage}
                    />&nbsp;%
                </li>
                {/*Calc. INS*/}
                <li className="tableCol">
                    {base.calc(base.strip(this.props.data.oilData.INS * this.props.data.oilPercentage / 100), 2)}
                </li>
                {/*操作*/}
                <li className="tableCol">
                    <a 
                        className="delete_btn"
                        data-row-index={this.props.index}
                        href="javascript:;"
                        onClick={this.props.handleDeleteRow}
                    >-</a>
                </li>
            </ul>
        );
    }
}

export default SelectRow;
