import React, { Component } from 'react'
import axios from 'axios'
import {
    Layout, Menu, Breadcrumb, Row, Col, Input, Button, Form, DatePicker, InputNumber, Select, Alert,
    Table, Divider, Tag, List, Card, Typography, Steps, message, Modal, Radio
} from 'antd';
import Icon from '@ant-design/icons';
import "antd/dist/reset.css"
import "./styles.css"
import locale from 'antd/lib/date-picker/locale/en_US';
const { Header, Content, Footer } = Layout;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;
const Step = Steps.Step;
const placesList = ["Chamba", "Hamirpur", "Lahaul and Spiti", "Mandi", 'Shimla', "Bilaspur", "Kinnaur",
    'Simraur', "Kullu", "Kangra", "Solan", "Una"]
// App's Main Page
const steps = [
    {
        title: "Select Room",
        content: "First-content"
    },
    {
        title: "Select Flight",
        content: "Second-content"
    },
    {
        title: "Confirmation of Data",
        content: "Last-content"
    }
];

export default class Main extends Component {
    next() {
        const value = this.state.current + 1;
        this.setState({ current: value });
    }

    listBedrooms = async (hotel_id, hotel_name) => {
        const value = this.state.current + 1;
        this.setState({ current: value });
        this.setState({ selectedHotelId: hotel_id });
        this.setState({ selectedHotelName: hotel_name })
        this.setState({ listDataSource: [] });
        axios
            .get(`http://localhost:9090/hoteis/${hotel_id}/quartos?occupation=free`)
            .then(response => {
                let bedroom_list = response.data._embedded.bedroomList;
                bedroom_list.map(bedroom => {
                    let bedroom_data = {
                        key: bedroom.number,
                        num_beds: bedroom.num_beds,
                        price: bedroom.price
                    };

                    console.log(bedroom_data)
                    this.setState({
                        listDataSource: [...this.state.listDataSource, bedroom_data]
                    });

                    //console.log(hotel_data);
                });
            })
            .catch(error => { })
            .finally(() => {
                this.setState({
                    show: true,
                })
            });
    }
    prev() {
        const value = this.state.current - 1;
        this.setState({ current: value });
    }
    state = {
        current: 0,
        listDataSource: [],
        hotelColumns: [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        }, {
            title: 'Stars',
            dataIndex: 'stars',
            key: 'stars',
        }],
        destination: "Una",
        origin: "AC",
        error: false,
        show: false,
        bedroomModalVisible: false,
        selectedHotelId: 0,
        selectedHotelName: "",
        selectedBedroomNum: 0,
    }

    generateDestOptions = () => { }
    onChange = (e) => { console.log(e); };
    showBedrooms = hotel_id => {
        this.setState({
            bedroomModalVisible: true,
        });

    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            bedroomModalVisible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            bedroomModalVisible: false,
        });
    }
    handleChangeDestination = (value) => {
        this.setState({ destination: value, })
    }

    handleChangeOrigin = (value) => {
        this.setState({ origin: value })
        console.log(this.state.origin)
    }

    makeRequest = async () => {
        this.setState({ listDataSource: [] });

        axios.get(`http://localhost:9090/hotels?location=${this.state.destination}`)
            .then((response) => {
                let hotel_list = response.data._embedded.hotelList
                hotel_list.map(hotel => {
                    let hotel_data = {
                        key: hotel.id,
                        name: "Hotel " + hotel.name,
                        state: hotel.state,
                        stars: hotel.stars
                    }
                    this.setState({ listDataSource: [...this.state.listDataSource, hotel_data] })
                    console.log(hotel_data);
                })
            }).catch((error) => { }).finally(() => {
                this.setState({ show: true, });
            });
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    onClose = (e) => {
        console.log(e, 'I was closed.');
    };
    renderStars = stars_num => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= stars_num)
                stars.push(
                    <Icon type="star" theme="filled" style={{ color: "#FAAD14" }} />
                );
            else stars.push(<Icon type="star" />);
        }
        return stars;
    };

    render() {
        return (
            <div id="Page">
                <Layout className="layout">
                    <Header id="Header">
                        <div className="logo" />
                        <Menu
                            id="Menu"
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item className="Menu-Item" key="1">Dashboard</Menu.Item>
                        </Menu>
                    </Header>
                    <Content id="Main-Container">
                        <div style={{ padding: 0, height: "100%" }}>
                            <Col id="Content-Container"
                                type="flex"
                                justify="start"
                                align="center">
                                <Row className="Search-Outter-Container"
                                    type="flex"
                                    justify="start"
                                    gutter={8}>
                                    <Col className="Col-Container" id="Package-Container" >
                                        Search the Package
                                    </Col>
                                    <Col >
                                        <Row type="flex" justify="center" gutter={8}>
                                            <Col className="Col-Container" >
                                                Match
                                            </Col>
                                            <Col className="Col-Container" >
                                                <Select
                                                    showSearch
                                                    size="default"
                                                    allowClear
                                                    emptyText="Oi"
                                                    placeholder="Local"
                                                    optionFilterProp="children"
                                                    onChange={this.handleChangeOrigin}
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    defaultValue="Chamba"
                                                    style={{ width: 120 }}>
                                                    {placesList.map(p => {
                                                        if (this.state.destination === p)
                                                            return (<Option key={p} disabled>{p}</Option>)
                                                        else
                                                            return (<Option key={p}>{p}</Option>)
                                                    })}
                                                </Select>
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
                                    </Col>

                                </Row>

                                {this.state.error ? (<Row id="Input-Alert">
                                    <Alert message="Unable to find the searched package"
                                        type="error"
                                        closable
                                        banner
                                        onClose={this.onClose}
                                    /></Row>) : ('')}
                                {this.state.show && <Row type="flex" justify="center" id="Steps-Row">
                                    <Col id="Steps-Col" align="start" >
                                        <Steps current={this.state.current}>
                                            <Step
                                                title="Select Hotel"
                                            />
                                            <Step
                                                title="Select Room"
                                            />
                                            <Step
                                                title="Select Flight"
                                            />
                                            <Step title="Confirm" />
                                        </Steps>
                                    </Col>
                                </Row>}

                                {this.state.show && <Row id="Hotel-Table">
                                    <List id="List"
                                        pagination={{
                                            onChange: page => {
                                                console.log(page);
                                            },
                                            pageSize: 6
                                        }}
                                        split
                                        size="large"
                                        itemLayout="vertical"
                                        header={<div id="List-Header">
                                            {this.state.current == 0 ? `Hotels in ${this.state.destination}` :
                                                `Rooms available in ${this.state.selectedHotelName}`}
                                        </div>}
                                        bordered
                                        dataSource={this.state.listDataSource}
                                        renderItem={item => (
                                            <List.Item key={item.key} className="Hotel-List-Container">
                                                <Row
                                                    className="Hotel-List-Item-Row"
                                                    type="flex"
                                                    justify="start"
                                                    align="middle"
                                                    gutter={8}
                                                >
                                                    <Col className="Hotel-List-Item-Col-Name" spawn={6}>
                                                        {this.state.current == 0 ? item.name : `Fourth number ${item.key}`}
                                                    </Col>
                                                    <Col
                                                        className="Hotel-List-Item-Col-Location"
                                                        spawn={6}
                                                    >
                                                        {item.state}
                                                    </Col>
                                                    <Col className="Hotel-List-Item-Col-Button" type="flex" align="end" spawn={6}>
                                                        <Button type="primary" onClick={() => this.listBedrooms(item.key, item.name)}>
                                                            {this.state.current == 0 ? "Select Hotel" : "Select Room"}</Button>
                                                    </Col>
                                                </Row>
                                            </List.Item>
                                        )}
                                    />
                                </Row>}

                                {this.state.show && <Row>
                                    <Col>
                                        <div className="steps-action">
                                            {this.state.current < steps.length - 1 && (
                                                <Button type="primary" onClick={() => this.next()}>
                                                    Next
                                                </Button>
                                            )}
                                            {this.state.current === steps.length - 1 && (
                                                <Button
                                                    type="primary"
                                                    onClick={() =>
                                                        message.success("Processing complete!")
                                                    }
                                                >
                                                    Done
                                                </Button>
                                            )}
                                            {this.state.current > 0 && (
                                                <Button
                                                    style={{ marginLeft: 8 }}
                                                    onClick={() => this.prev()}>
                                                    {this.state.current == 1 ? "Back to Hotels" : "To go back"}
                                                </Button>
                                            )}
                                        </div>
                                    </Col>
                                </Row>}
                            </Col>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }} >
                        Booking App 2023 Created by Sukhvinder
                    </Footer>
                </Layout>
            </div>
        );
    }
}
