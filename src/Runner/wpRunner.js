import React, { Component } from 'react';
import './wpRunner.css';
import Image1 from "./Images/logo.jpg"
import Image2 from './Images/5.jpg';
import io from 'socket.io-client';
import request from 'ajax-request'
// const socket = io.connect('http://omrilaptop:9000');

class Runner extends Component {
  state = {
      msgArr: [],
      msgId : []
  };

  constructor(props) {
      super(props);


//              url: "http://77.138.252.15:8080/smartspace/actions/story/2019b.sean.smartspace/lior.itzhakMANAGER@gmail.com/2019b.sean.smartspace/5cf12b23444e7c3750310fc2?page=0&size=4",
     request( {
         url: "https://smartspace-2019b-sean.herokuapp.com:80/smartspace/elements/2019b.sean.smartspace/lior.itzhakMANAGER@gmail.com",
         method : 'POST',
         data : {
             "location": null,
             "name" : "test",
             "type": "type",
             "expired": false,
             "moreAttributes": null
         }
     }, (err, res, body) => {
         if (body != null) {
             const json = JSON.parse(body);
             const smartspace = json.key.smartspace;
             const id = json.key.id;
             this.setState({
                 msgId: id
             });

             //"https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl="+id

             setInterval(() => {
                 request({
                     url: "https://smartspace-2019b-sean.herokuapp.com:80/smartspace/actions/story/2019b.sean.smartspace/lior.itzhakMANAGER@gmail.com/" + smartspace + "/" + id + "?page=0&size=4",
                     method: 'GET'
                 }, (err, res, body) => {
                     if (body != null) {
                         this.setState({
                             msgArr: JSON.parse(body)
                         });
                     } else {
                         console.log(err)
                     }
                 });
             }, 10000);
         }
     });
  }

  render() {
    return (
      <div className="Runner">
          {
              this.state.msgArr ? <img className="logo" src={"https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl="+this.state.msgId}/> :
                  <img className="logo" src={Image1}/>
          }
        <div className="innerRunner">
        {this.state.msgArr.map((msg) => {

            return msg.imageUrl ?
              <div className="PopMsgImg">
                  <img id="MsgImg" className="MsgImg" src={msg.imageUrl}/>
                  <p className="PopMsgText">{msg.blessing}</p>
              </div>:
              <div className="PopMsg">
                <p className="PopMsgTextName" style={{color: "#0000009c"}}>{msg.username}</p>
                <p className="PopMsgText">{msg.blessing}</p>
              </div>
        })}
        </div>
      </div>
    );
  }
}
export default Runner;
