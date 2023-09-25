import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useState } from 'react';
import fileDownload from 'js-file-download'


function App() {

  const [file,setFile]=useState("");

  const[converted,setConverted] = useState("")

  const [loading,setLoading] = useState()
 

  const handleFileChange=(event)=>{
    setFile(event.target.files[0])
    

}


  const videoUpload = () => {
    let formData=new FormData();
    formData.append("file",file)
    console.log(file)

    setLoading(true)

    // we have to send it to our api

    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
      }

      axios.post("https://audio-video-converter-digikull.onrender.com/upload",formData,config).then(data=> {
        console.log(data)
      
        setConverted(data.data.fileLink)

        if(data) {
          setLoading(false)
        }
      }).catch(err => {{
        if(err) {
          alert("File Not Supported")
        }
        console.log(err)  
      }})

      

  }

  

  return (
    <div className="App">
      <h3>Video to Audio Converter Online</h3>

      <input type="file" onChange={handleFileChange}/>
      <div>
        <br/>
        <br/>
      <button onClick={videoUpload}> Convert </button>
      </div>

      <br/>
        <br/>
      
      <div>
        {
          loading?"processing.....":""
        }

        {
          loading == false?<a
          href={converted}
          download = 'file.mp3'
            onClick={() => {
            fileDownload(converted, "nok.mp3")
            console.log(converted)
            
          }
}
        >
          <button>Audio is Ready</button>
        </a>:""
        }


      </div>

      
    </div>
  );
}

export default App;
