import React, { Component, ImageBackground } from "react";
import axios from "axios";

//import background from "../../assets/background.jpg"
import {
  Layout,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Input,
  Button,
  Form,
  DatePicker,
  InputNumber,
  Select,
  Alert,
  Table,
  Divider,
  Tag,
  List,
  Card,
  Typography,
  Steps,
  message,
  Modal,
  Radio
} from "antd";
import Icon from '@ant-design/icons';
import "./styles.css";



import SearchBox from "./components/SearchBox"

const { Header, Content, Footer } = Layout;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;
const Step = Steps.Step;
const placesList = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RR",
  "RO",
  "RJ",
  "RN",
  "RS",
  "SC",
  "SP",
  "SE",
  "TO"
];

const steps = [
  {
    title: "Selecionar Hotel",
    content: "First-content"
  },
  {
    title: "Selecionar Quarto",
    content: "Second-content"
  },
  {
    title: "Selecionar Vôo",
    content: "Second-content"
  },
  {
    title: "Confirmação dos Dados",
    content: "Last-content"
  }
];

// App's Main Page
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

    if (value == 0) {
      this.makeRequest();
    }
  }

  state = {
    current: 0,
    listDataSource: [],
    hotelColumns: [
      {
        title: "Nome",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Estado",
        dataIndex: "state",
        key: "state"
      },
      {
        title: "Estrelas",
        dataIndex: "stars",
        key: "stars"
      }
    ],
    destination: "AL",
    origin: "AC",
    error: false,
    show: false,
    bedroomModalVisible: false,
    selectedHotelId: 0,
    selectedHotelName: "",
    selectedBedroomNum: 0,


  };

  generateDestOptions = () => { };

  onChange = e => {
    console.log(e);
  };

  handleChangeDestination = value => {
    this.setState({
      destination: value
    });
  };

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

  handleChangeOrigin = value => {
    this.setState({
      origin: value
    });

    console.log(this.state.origin);
  };

  makeRequest = async () => {
    this.setState({ listDataSource: [] });
    axios
      .get(`http://localhost:9090/hoteis?location=${this.state.destination}`)
      .then(response => {
        let hotel_list = response.data._embedded.hotelList;
        hotel_list.map(hotel => {
          let hotel_data = {
            key: hotel.id,
            name: "Hotel " + hotel.name,
            state: hotel.state,
            stars: hotel.stars
          };

          //console.log(hotel_data)
          this.setState({
            listDataSource: [...this.state.listDataSource, hotel_data]
          });

          console.log(hotel_data);
        });
      })
      .catch(error => { })
      .finally(() => {
        this.setState({
          show: true,
        })
      });
  };

  loadBedrooms = async () => {
    this.setState({ listDataSource: [] });
    axios
      .get(`http://localhost:9090/hoteis?location=${this.state.destination}`)
      .then(response => {
        let hotel_list = response.data._embedded.bedroomList;
        hotel_list.map(hotel => {
          let hotel_data = {
            key: hotel.id,
            name: "Hotel " + hotel.name,
            state: hotel.state,
            stars: hotel.stars
          };

          //console.log(hotel_data)
          this.setState({
            listDataSource: [...this.state.listDataSource, hotel_data]
          });

          console.log(hotel_data);
        });
      })
      .catch(error => { })
      .finally(() => {
        this.setState({
          show: true,
        })
      });
  };

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  onClose = e => {
    console.log(e, "I was closed.");
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
      
        <Layout id="Layout">

          

          <Content id="Main-Container">
            <div style={{ padding: 0, height: "100%" , width: "100%"}}>

              <Col
                id="Content-Container"
                type="flex"
                justify="start"
                align="center"
              >
                <SearchBox 
                searchFunction={this.makeRequest} 
                destination={this.state.destination} 
                origin={this.state.origin} 
                handleChangeDestination={this.handleChangeDestination}
                handleChangeOrigin={this.handleChangeOrigin}/>

                {this.state.error ? (
                  <Row id="Input-Alert">
                    <Alert
                      message="Não foi possível encontrar o pacote pesquisado"
                      type="error"
                      closable
                      banner
                      onClose={this.onClose}
                    />
                  </Row>
                ) : (
                    ""
                  )}

                {this.state.show && <Row type="flex" justify="center" id="Steps-Row">
                  <Col id="Steps-Col" align="start" >
                    <Steps current={this.state.current}>
                      <Step
                        title="Selecionar Hotel"
                      />
                      <Step
                        title="Selecionar Quarto"
                      />
                      <Step
                        title="Selecionar Vôo"
                      />
                      <Step title="Confirmar Dados" />
                    </Steps>
                  </Col>
                </Row>}
                {this.state.show && <Row id="Hotel-Table">
                  <List
                    id="List"
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

                      {this.state.current == 0 ? `Hotéis em ${this.state.destination}` :
                        `Quartos disponíveis em ${this.state.selectedHotelName}`}
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
                            {this.state.current == 0 ? item.name : `Quarto número ${item.key}`}
                          </Col>
                          <Col
                            className="Hotel-List-Item-Col-Location"
                            spawn={6}
                          >
                            {this.state.current == 0 ? item.state : `${item.num_beds} camas no quarto`}
                          </Col>
                          <Col className="Hotel-List-Item-Col-Stars" spawn={6}>
                            {this.state.current == 0 ? this.renderStars(item.stars) : `R$ ${item.price} p/ noite`}
                          </Col>
                          <Col className="Hotel-List-Item-Col-Button" type="flex" align="end" spawn={6}>
                            <Button type="primary" onClick={() => this.listBedrooms(item.key, item.name)}>{this.state.current == 0 ? "Selecionar Hotel" : "Selecionar Quarto"}</Button>
                          </Col>
                        </Row>
                      </List.Item>
                    )}
                  />
                </Row>}

                {this.state.show && <Row>
                  <Col>
                    <div className="steps-action">
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
                          onClick={() => this.prev()}
                        >
                          {this.state.current == 1 ? "Voltar para Hotéis" : "Voltar"}
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>}
              </Col>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}