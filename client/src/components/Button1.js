import React from 'react'

function Button1( {title,
    variant= "contained",
    color= "primary", type = "button", onClick, fullWidth = false}) {
       
        let className= "pt-1 pb-1 rounded pointer ";
          if(variant === "contained") {
            className+= "bg-" + color + " text-white";
          }
          else if(variant === "outlined") {
            className+= "border-" + color + " text-" + color;
          }
        
        (fullWidth)? (className+= " w-100 "): (className+=  " pr-2 pl-2 ");
          return (
            <button className={className} type={type}  onClick={onClick}>{title}</button>
          )
}

export default Button1;


// import React from 'react'

// function Button(
//     {title,
//     variant= "contained",
//     color= "primary"}
// ) {

//   let className= "w-100 ";
//   if(variant === "contained") {
//     className+= "bg-" + color + " text-white";
//   }
//   else if(variant === "outlined") {
//     className+= "border-" + color + " text-" + color;
//   }


//   return (
//     <button className={className}>{title}</button>
//   )
// }

// export default Button;