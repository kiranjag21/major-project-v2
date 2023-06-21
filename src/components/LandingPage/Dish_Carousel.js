import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'

export default class DishCarousel extends Component{

  dishes=[
    {src:'../assets/img/img-01.jpg'},
    {src:'../assets/img/img-02.jpg'},
    {src:'../assets/img/img-03.jpg'},
    {src:'../assets/img/img-04.jpg'},
    {src:'../assets/img/img-05.jpg'},
    {src:'../assets/img/img-06.jpg'},
    {src:'../assets/img/img-07.jpg'}
  ]

  render(){
    return(
      <div>
           <div className='container' style={{marginTop:"0",border:'2px solid #c3073f',padding:'0',borderRadius:'4px'}}>
               <Carousel interval={2000}>
                 {this.dishes.map(item=>(
                   <Carousel.Item style={{'height':"400px"}} >
                   <img style={{'height':"400px"}}alt=""
                    className="d-block w-100"
                    src={item.src}/>
                  </Carousel.Item  >
                 ))}
                </Carousel>
            </div>
      </div>
    )
  }
}