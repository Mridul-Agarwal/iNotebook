import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, Source} = this.props
    return (
      
        <div className="card my-2" >
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
            <div >
                <h5 className="card-title">{title}
                <span className="badge rounded-pill bg-danger" style={{display:'flex', justifyContent:'flex-end', position:'absolute',top:0, right:0 }}>
                    {Source}
                </span></h5>
                </div>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>

            </div>
        </div>
      
    )
  }
}

export default NewsItem
