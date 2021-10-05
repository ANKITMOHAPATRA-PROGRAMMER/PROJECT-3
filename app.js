console.log('WE ARE AT PROJECT 6');

//UTILITY FUNCTION;

//1>UTILITY FUNCTION TO GET DOM ELEMENT FROM STRING

function getElementFromString(string) {

  let div = document.createElement('div');

  div.innerHTML = string;

  return div.firstElementChild;

}

//INITIALISE THE NUMBER OF PARAMETERS

let addedParamsCount = 0

//HIDE THE PARAMETERS BOX INITIALLY

let parametersBox = document.getElementById('parametersBox');

parametersBox.style.display = 'none';

//IF THE USER CLICKS ON PARAMS HIDE JSPARAMS

let paramsRadio = document.getElementById('paramsRadio');

paramsRadio.addEventListener('click',()=>{

  document.getElementById('requestJsonBox').style.display = 'none';

  document.getElementById('parametersBox').style.display = 'block';

  

})

//IF THE USER CLICKS ON JSON BOX HIDE PARAMS BOX

let jsonRadio = document.getElementById('jsonRadio');

jsonRadio.addEventListener('click',()=>{

  document.getElementById('parametersBox').style.display = 'none';

  document.getElementById('requestJsonBox').style.display = 'block';

})

//IF THE USER CLICKS ON PLUS BUTOON ADD MORE PARAMETERS

let addParam = document.getElementById('addParam')

addParam.addEventListener('click',()=>{

  let params = document.getElementById('params');

  let string =` <div class="form-row my-2">

                <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>

                <div class="col-md-4">

                    <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Key">

                </div>

                <div class="col-md-4">

                    <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Value">

                </div>

                <button class="btn btn-primary deleteParam">-</button>

            </div>`;

      //CONVERT THE ELEMENT STRING TO DOM MODE

      let paramElement = getElementFromString(string);

      params.appendChild(paramElement)

      //ADD AN EVENT LISTNER ON CLICKING - BUTTON

      let deleteParam = document.getElementsByClassName('deleteParam');

    for (item of deleteParam) {

        item.addEventListener('click', (e) => {

            //TODO: add a confirmation box to confirm parameter deletion.

            e.target.parentElement.remove();

        })

    }

    addedParamsCount++;

})

//IF THE USER CLICKS ON SUBMIT BUTTON 

let submit = document.getElementById('submit');

submit.addEventListener('click',()=>{

  //SHOW PLEASE WAIT IN THE RESPONSE BOX

  //document.getElementById('responseJsonText').value = 'PLEASE WAIT............FETCHING RESPONSE....';

  document.getElementById('responsePrism').innerHTML = 'PLEASE WAIT............FETCHING RESPONSE....';

  //FETCH ALL THE VALUES USER HAS ENTERED

  let url = document.getElementById('url').value;

  let requestType = document.querySelector("input[name = 'requestType']:checked").value;

  let contentType = document.querySelector("input[name = 'contentType']:checked").value;

  //IF USER HAS USED PARAMS INSTEAD OF JSON COLLECT ALL THE PARAMETERS

  if(contentType == 'params'){

    data = {};

    for (i= 0;i<addedParamsCount+1; i++) {

     if(document.getElementById('parameterKey' + (i+1)) != undefined){

        let key = document.getElementById('parameterKey' + (i+1)).value;

         let value = document.getElementById('parameterValue' + (i+1)).value;

         data[key] = value;

        }

      } 

      data = JSON.stringify(data)

    }

    else{

      data = document.getElementById('requestJsonText').value

    }

     //LOG ALL THE VALUES IN THE CONSOLE

       console.log('URL',url)

       console.log('requestType', requestType)

       console.log('contentType',contentType)

       console.log('data is',data)

       //IF THE REQUEST TYPE IS POST INVOKE FETCH API TO CREATE A POST REQUEST

       

       if(requestType=='GET'){

         fetch(url, {

           method: 'GET',

         })

         .then(response=> response.text())

         .then((text) =>{

           //document.getElementById('responseJsonText').value = text;

           document.getElementById('responsePrism').innerHTML = text;

            Prism.highlightAll();

         } )

       }

       else{

        fetch(url, {

            method: 'POST', 

            body: data,

            headers: {

                "Content-type": "application/json; charset=UTF-8"

              }  

        })

        .then(response=> response.text())

        .then((text) =>{

            // document.getElementById('responseJsonText').value = text;

            document.getElementById('responsePrism').innerHTML = text;

            Prism.highlightAll();

        });

    }

       

})

