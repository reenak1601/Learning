//node wcat.js filepath1 filepath2
 
const fs = require("fs"); //require fs module 
let inputArr=process.argv.slice(2) ;  
console.log(inputArr) ;


let filesArr=[] ;  //path of files
let optionsArr=[] ;  //-n,-s,-b

for(let  i=0; i<inputArr.length; i++)
{
    let firstChar = inputArr[i].charAt(0);
    // console.log(firstChar);

    if(firstChar=="-")
      {
       optionsArr.push(inputArr[i]) ;
      //  console.log(optionsArr);
     }
   else {
            filesArr.push(inputArr[i]) ;
           //  console.log(filesArr);
  }

}


// check files exist or not 

for(let i=0 ; i<inputArr.length ; i++)
{
    let doesExist=fs.existsSync(filesArr[i] ) ;
     
    if(!doesExist)
    {
        console.log("file does not exist");
        process.exit () ;   //return 
    }
}


//read and append file
let content=""
for(let i=0 ; i<filesArr.length ; i++)
{
    let fileContent=fs.readFileSync(filesArr[i]) ;
    content=content+fileContent+ "\r\n"
}

console.log(content);

let contentArr=content.split("\r\n") ;
console.log(contentArr);

// check if -s is present or not 

let tempArr=[] ;
let isSpresent=optionsArr.includes("-s") ;
if(isSpresent)
{
    for(let i=1 ;i<contentArr.length ; i++)
    {
      if(contentArr[i]==" "&& contentArr[i-1]==" ")
      {
          contentArr[i]=null ;
      }
     else if(contentArr[i]==" "&& contentArr[i-1]==null)
      {
          contentArr[i]=null ;
      }
    }
    console.table(contentArr);


    //push everything in contentArr

    for(let i=0 ; i<contentArr ; i++)
    {
        if(contentArr[i]!=null)
        {
            tempArr.push(contentArr[i]) ;
        }
    }
      contentArr=tempArr ;
}

let indexOfN=optionsArr.indexOf(-n) ;
let indexOfB=optionsArr.indexOf(-b) ;
// if -n and -b is not present return -1 

// if both -n and -b is present 
let finalOption=" " ;
if(indexOfN!=-1 && indexOfB!=-1)
{
  if(indexOfN>indexOfB)
  {
    (finalOption=="-n")
  }
   else {
    (finalOption=="-b")
   }
}

// if -n or -b is present 

else {
        if(indexOfN!=-1)
        {
            (finalOption=="-n") ;
        }
        else if(indexOfN!=-1)
            {
                (finalOption=="-b") ;
            }
        }
   if(finalOption=="-n")
   {
       modifyByoptionN() ;
   }
    else if(finalOption=="-b")  
    {
        modifyByoptionB() ;
    }
      
   // function for -n 
      function modifyByoptionN() 
      {
          for(let i=0 ; i< contentArr.length; i++)
          {
              contentArr[i]=(i+1) + ")" + contentArr ;
          }
      }
   
      //function for -b

      function modifyByoptionB() 
      {  
          count=1 ;  
         for(let i=0; i<contentArr.length ; i++)
         {
             if(contentArr[i]!="")
             {
                 contentArr[i]=count + ")" + contentArr[i] ;
                 count++ ;
             }
         }
      }

console.log(contentArr);
