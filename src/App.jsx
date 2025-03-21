import { useState } from "react";
import "./App.css";

export const App = () => {
  const [img,setImg] =useState();
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("150");

  async function generateQR(){
    setLoading(true);
    try{
        if(qrData){
          const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
          setImg(url);
        }  
    }
    catch(error){
      console.error("Error generating in QE code",error);
    }
    finally{
      setLoading(false);
    }
  }

  function downloadQR(){
    fetch(img).then((responsee)=>responsee.blob())
    .then((blob)=>{
      const link = document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="QrCode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error)=>{
      console.error("Error downloading QR code",error);
    })
  }

  return (
    <div className="app-container">
      <h1>QR CODE GENETADTOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} alt="image" className="qr-code-img"  />}
      <div>
        <label htmlFor="dataInput" className="input-label">
            Data for input code:
        </label>
        <input type="text"  id="dataInput" value={qrData} placeholder="Enter data for QR Code" onChange={(e)=>{setQrData(e.target.value)}}/>
        <label htmlFor="sizeInput" className="input-label">
          Image size (eg., 150)
        </label>
        <input type="text" id="sizeInput" value={qrSize} placeholder="Enter image size"  onChange={(e)=>{setQrSize(e.target.value)}} />
        <button className="generate-btn" disabled={loading} onClick={generateQR}>
            Generate QR Code</button>
        <button className="download-btn" onClick={downloadQR}>Download QR Code</button>
      </div>
      <p className="footer">Developed By <a href="">Arun ts</a></p>
    </div>
  )
}
