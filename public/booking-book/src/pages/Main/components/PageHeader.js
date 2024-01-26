import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "./PageHeader.css";

export default function PageHeader(){
    return(
        <div>
            <Header id ="Header">
                <Menu
                id="Menu"
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                style ={{lineHeight:"64px"}}>
                    <Menu.Item key="1">
                        Reservations
                    </Menu.Item>
                </Menu>
            </Header>
        </div>
    )
} 