import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {
    
    capitalizeFirstLetter=(string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        console.log("Hlo I am a constructor ")
        this.state = {
            articles: [],
            loading:false,
            page:1,
            totalResults:0
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} - MacNews`
    }

    async componentDidMount(){
        this.props.setProgress(10)
        this.setState({page: this.state.page + 1})
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedData = await data.json()
        console.log(parsedData)
        this.props.setProgress(70)
        this.setState({articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }

    fetchMoreData = async()=>{
                this.setState({page: this.state.page + 1})
                const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1785c796245c40a493d10c14fa4d5c72&page=${this.state.page}&pageSize=${this.props.pageSize}`;
                // this.setState({loading:true})
                let data = await fetch(url);
                let parsedData = await data.json()
                console.log(parsedData)
                this.setState({articles: this.state.articles.concat(parsedData.articles), 
                    totalResults: parsedData.totalResults,
                    loading: false
                })
                
    }

    // handlePrevBtn=async()=>{
    //     console.log("Previous")
    //     let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=1785c796245c40a493d10c14fa4d5c72&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     console.log(parsedData)
    //     this.setState({
    //         page : this.state.page-1,
    //         articles : parsedData.articles,
    //         loading: false
    //     }) 
    // }

    // handleNextBtn=async()=>{
    //     console.log("Next")
    //     if(this.state.page +1>Math.ceil(this.state.totalResults/this.props.pageSize)){

    //     }
    //     else{
    //     let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=1785c796245c40a493d10c14fa4d5c72&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     console.log(parsedData)
    //     this.setState({
    //         page : this.state.page+1,
    //         articles : parsedData.articles,
    //         loading: false
    //     })
    // }
    // }
  render() {
    return (
      <>
            <h2 className='text-center' style={{margin:"40px", marginTop:"90px"}}>MacNews- Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner/>}
        >
                <div className="container">
                {/* {this.state.loading && <Spinner/>} */}
                    <div className="row">
                    {this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem Source = {element.source.name} title = {element.title} description = {element.description?element.description.slice(0, 98):""} author={element.author} date={element.publishedAt} imageUrl= {element.urlToImage?element.urlToImage:"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"} newsUrl={element.url}/>
                        </div>
                    })}
                    </div>
                        
                    </div>
            </InfiniteScroll>
            <div className="container d-flex justify-content-between">
            {/* <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevBtn}>&larr; Previous</button> */}
            {/* <button disabled= {this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize) } type="button" className="btn btn-dark" onClick={this.handleNextBtn}>Next &rarr;</button> */}
            </div>
      </>
    )
  }
}

export default News
