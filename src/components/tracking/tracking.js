import axios from 'axios';
import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FiCheckSquare, FiCheck } from 'react-icons/fi';
import { RiEBike2Fill } from 'react-icons/ri';
import { FaRegSmile } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
var count = 0;
const mapStateToProps = state => {
  return {
    connection: state.connection.connection,

  }
}
class TrackOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      de_name: '',
      availabel: true,
      accepted: false,
      pickup: false,
      delivered: false,

    }
  }
  componentDidMount() {
    if (count <= 1) {

      this.props.connection.channel.bind('order-accepted', (data) => {

          this.setState({
              de_name: data,
              accepted: true
          })
      });

      this.props.connection.channel.bind('order-pickup', (data) => {

          this.setState({
              pickup: true
          })
      });

      this.props.connection.channel.bind('not_availabel', (data) => {

          this.setState({
              availabel: false
          })
      });

      this.props.connection.channel.bind('order-delivered', (data) => {

          this.setState({
              delivered: true
          })
          axios({
              method: 'POST',
              url: `${process.env.BASE_URL}/api/restaurants/orders`,
              data: data
          })
              .then((response) => {
                  //this.props.removeLiveOrder(data);	
              })
              .catch((error) => console.log(error));


      });
  }

  //   });

  }
  // componentWillUnmount() {
  //   //window.removeEventListener('beforeunload', this.disconnect);
  //   console.log('unmount')
  //   this.props.resetState();
  // }

  
  render() {
    
    return (
      <div className="container " style={{ height: '60vh'}}>

        {
          this.state.availabel ?



            <VerticalTimeline>
              <h5>Order Status</h5>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<FiCheckSquare />}
              >
                <p>Order Placed</p>
              </VerticalTimelineElement>

              {
                this.state.accepted ?
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<FiCheck />}
                  >
                    <p>Order Accepted by DE: <p style={{ fontWeight: "bold" }}>{this.state.de_name}</p></p>
                  </VerticalTimelineElement>
                  : null
              }

              {
                this.state.pickup ?
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    icon={<RiEBike2Fill />}
                  >
                    <p>Order Pickup done from the restaurant.</p>
                  </VerticalTimelineElement>
                  : null
              }
              {
                this.state.delivered ?
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    icon={<FaRegSmile />}
                  >
                    <p>Order delivered.</p>
                  </VerticalTimelineElement>
                  : null
              }



            </VerticalTimeline>
            : <div><p className="lead" style={{ color: 'red', height: '60vh'}}>Oops!!! looks like all delivery executives are busy.</p>
            {/* <VerticalTimeline>
              <h5>Order Status</h5>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<FiCheckSquare />}
              >
                <p>Order Placed</p>
              </VerticalTimelineElement>

             
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<FiCheck />}
                  >
                  <p>Order Accepted by DE: </p>

                  </VerticalTimelineElement>
                  
             
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    icon={<RiEBike2Fill />}
                  >
                    <p>Order Pickup done from the restaurant.</p>
                  </VerticalTimelineElement>
                  
             
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    icon={<FaRegSmile />}
                  >
                    <p>Order delivered.</p>
                  </VerticalTimelineElement>
                  
              



            </VerticalTimeline> */}</div> 
            
        }

      </div>
    )
  }
}
export default withRouter(connect(mapStateToProps)(TrackOrder));
