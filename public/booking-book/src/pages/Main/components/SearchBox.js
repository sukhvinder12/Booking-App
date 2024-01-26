import axios from "axios";

import {
    Layout,
    DatePicker,
    Row,
    Col,
    Button,
    InputNumber,
    Select,
} from "antd";
import "./SearchBox.css"
import locale from "antd/lib/date-picker/locale/pt_BR";

const { Header, Content, Footer } = Layout;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;
const placesList = ["Chamba", "Hamirpur", "Lahaul and Spiti", "Mandi", 'Shimla', "Bilaspur", "Kinnaur",
    'Simraur', "Kullu", "Kangra", "Solan", "Una"]

    export default function () {
    return (
        <Row className="Search-Outter-Container"
            type="flex"
            justify="start"
            gutter={8}>
            <col className="Col-Container" id="Package-Container">
                Search the Package
            </col>
            <col >
                <Row type="flex"
                    justify="start"
                    gutter={8}>
                    <Col className="Col-Container">
                        Match
                    </Col>
                    <Col className="Col-Container">
                        <select showSearchsize="default"
                            allowClearplaceholder="Local"
                            optionFilterProp="children"
                            onChange={this.props.handleChangeOrigin}
                            filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                            defaultValue="Una"
                            style={{ width: 120 }}>
                            {placesList.map(p => {
                                if (this.props.destination === p)
                                    return (
                                        <option key={p} disabled>
                                            {p}
                                        </option>
                                    ); else
                                    return <option key={p}>{p}</option>
                            }
                            )}
                        </select>
                    </Col>
                    <Col className="Col-Container" >
                        Destination
                    </Col>
                    <Col className="Col-Container" >
                        <Select
                            showSearch
                            size="default"
                            allowClear
                            placeholder="Local"
                            optionFilterProp="children"
                            onChange={this.handleChangeDestination}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            defaultValue="Una"
                            style={{ width: 120 }}>
                            {placesList.map(p => {
                                if (this.state.destination === p)
                                    return (<Option key={p} disabled>{p}</Option>)
                                else
                                    return (<Option key={p}>{p}</Option>)
                            })}
                        </Select>
                    </Col>
                    <Col className="Col-Container">
                        Period
                    </Col>
                    <Col className="Col-Container" >
                        <RangePicker locale={locale} onChange={this.onChange} />
                    </Col>
                    <Col className="Col-Container" >
                        No. of Passengers
                    </Col>
                    <Col className="Col-Container" >
                        <InputNumber min={1} max={10} defaultValue={1} onChange={this.onChange} />
                    </Col>
                    <Col className="Col-Container" id="End" >
                        <Button type="primary" onClick={this.makeRequest}>Search</Button>
                    </Col>
                </Row>
            </col>
        </Row>
    )
}