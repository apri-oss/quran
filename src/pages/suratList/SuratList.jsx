import React, {Component, Fragment} from 'react';
import axios from 'axios';
import './SuratList.css';
import { Helmet } from 'react-helmet';
import Spinner from '../../spinner/Spinner';

class SuratList extends Component{

  state = {
    data_quran:[],
    max_number: 20,
    is_showMore: false,
    is_loading: true

  }

  getPostApi = () => {
    axios.get('https://quranapi.idn.sch.id/surah')
    .then((result) =>{     
      console.log(result.data.data)
      this.setState({
        data_quran: result.data.data,
        is_loading: false
      })
    })
  }

  handleDetail = (number) => {
    window.location.href = `/surat/${number}`
  }

  ShowMore = () => {
    this.setState({
      max_number: this.state.data_quran.length,
      is_showMore: true
    })    
  }

  componentDidUpdate(){
    let showmorebutton = document.getElementById("surat-list-btn-show-more");
    if (this.state.is_showMore === true){
      showmorebutton.style.display = "none";
    }

  }

  //using axios
  componentDidMount(){
    this.getPostApi();

  }

  render(){
    return(
      <Fragment>
        <Helmet>
          <title>Quran</title>
        </Helmet>
        
        {  
          this.state.data_quran.slice(0, this.state.max_number).map(quran =>{
            return(
              
              <div className="surat-list-card-warpper" onClick ={() => this.handleDetail(quran.number)}>
                
                <div className="surat-list-card-surat-wrapper">
                  
                  <div className="surat-list-nomor-surat-wrapper">
                    <div className="surat-list-box-number-wrapper">
                      <p>{quran.number}</p>
                    </div>
                  </div>

                  <div className="surat-list-nama-surat-latin-wrapper">
                    <p className="surat-list-p-nama">{quran.name}</p>
                    <br />
                    <p className="surat-list-p-arti">{quran.translationId}</p>
                  </div>

                  <div className="surat-list-nama-surat-arab-wrapper">
                    <p className="surat-list-p-nama-arab" >{quran.asma}</p>
                    <br />
                    <p className="surat-list-p-ayat" >{quran.numberOfAyahs} ayat</p>
                  </div>
                  
                </div>
              </div> 
            )
          })
          
        }
        {this.state.is_loading ? (<Spinner/>) : 

          <button id="surat-list-btn-show-more" onClick ={() => this.ShowMore(true) }>Show More</button> 
        }



      </Fragment>
    )
  }
}

export default SuratList;