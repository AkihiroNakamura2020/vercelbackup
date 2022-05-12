import Image from 'next/image'

export default function MyImage(props) {
    //let fname = './' + props.fname
    let fname = '/' + props.fname
    let size = props.size + "px"
  
    return (
      // <img width={size} border="1"
       <Image width={size}  height="250px" border="0"
          src={fname} />
    )
  }