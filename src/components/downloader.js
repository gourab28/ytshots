import React, { Component } from "react";
import {Form, Container, Row, Col} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
//mportt axios from 'axios';
//import Collapse from '@material-ui/core/Collapse';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReactPlayer from "react-player";
//import DownloadLink from "react-download-link";
import LoadingBar from './loading';

export default class ButtonLoader extends Component {
  state = {
    error: 'Error',
    loading: false,
    items: [],
    url: '',
    validated: false
  };

  fetchData = async() => {
   await fetch("https://api.shortsloader.com/videoInfo?videoURL="+this.state.url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loading: true,
           // isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error: 'Please Paste Valid Link'
          });
        }
      )
    //this.setState({ loading: true });
    //Faking API call here
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    
  };
  
  clear = () => {
    this.setState({ loading: true})
  }

  render() {
    const { loading } = this.state;
    const {items} = this.state;
    const {url} = this.state;
    const {isLoaded} = this.state;
   const {validated} = this.state;
   const {error} = this.state;
   
   console.log(items);
  //  let color = items.length < 1 ? 'zero' : (items.length <= 30 ? '' : '');
  //const handleSubmit = (event) => {
    
//  };
const downloadVideo = () => {
        window.open(`https://api.shortsloader.com/download?videoURL=${this.state.url}`, "_self");     
    }
    const downloadAudio = () => {
        window.open(`https://api.shortsloader.com/audio/download?videoURL=${this.state.url}`, "_self");     
    }
   // let color = items.statu < 10 ? 'zero' : (items.statu <= 30 ? 'searchbtn' : 'searchbtn');

    return (
      <div>
      <h1 className="h1-font">YouTube Shorts Downloader</h1>
      <Container>
       <Row>
       <Col xs={12} md={12}>
       <Form noValidate validated={this.state.validated}>
      <Form.Group>
        <Form.Control 
        className="form-search"
        size="lg"
        required
        onChange={(event) => this.setState({ url: event.target.value })}
        //onChange={event => this.setSate(event.target.value)}
        type="url" 
        placeholder="Paste link here" />
      <Form.Control.Feedback type="invalid">
            Please provide a valid URL
      </Form.Control.Feedback>
      </Form.Group>
     </Form>
      </Col>
      <Col xs={12} md={12}>
        <button 
        disabled={this.state.url.length<13}
        style={{
        borderRadius: 35,
        backgroundColor: "#FF0000",
        fontFamily: 'Poppins',
        fontSize: "18px",
        color: "#fff"
    }}
        className="btn searchbtn" 
        onClick={() => { this.fetchData (); this.clear (); }}
        >
          {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {loading && <span>Loading...</span>}
          {!loading && <span>Download</span>}
        </button>
          </Col>
        </Row>
       </Container>
        
       <h3
        //style={{
      //  display: loading ? "none" : ""
      //  }}
        className="mt-5"> {items.title} </h3>
       <ReactPlayer 
          className="mb-3"
          
          url={items.url} 
          width="100%" height="50%" 
          controls={true} />
          <Button 
             variant="contained" 
              color="primary"
              onClick={() => downloadVideo()}
               style={{
                 backgroundColor: "#FF0000",
                 fontFamily: 'Poppins',
                 fontSize: "12px",
                 textDecoration: "none",
                 display: this.state.items.length<13  ? "none" : "",
                 marginTop: "10px"
                 }}
                 className="searchbtn"
                 > 
                 <PlayArrowIcon /> Download Video
                </Button>
            <Button 
             variant="contained" 
              color="primary"
              onClick={() => downloadAudio()}
               style={{
                 backgroundColor: "#FF0000",
                 fontFamily: 'Poppins',
                 fontSize: "12px",
                 textDecoration: "none",
                 display: this.state.items.length<13  ? "none" : "",
                 marginTop: "10px"
                 }}
                 className="searchbtn"
                 > <AudiotrackIcon /> Download Audio
    </Button>
      </div>
    );
  }
}