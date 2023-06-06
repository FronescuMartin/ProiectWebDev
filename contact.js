window.onload=function(){
    //save the form to localStorage
    function saveFormData() {
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
        localStorage.setItem('formData', JSON.stringify(formDataObj));
    }

    // load data from localStorage
    function loadFormData() {
        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            const formDataObj = JSON.parse(savedFormData);
            for (const field in formDataObj) {
                if (formDataObj.hasOwnProperty(field)) {
                    form.elements[field].value = formDataObj[field];
                }
            }
        }
    }

    //random coloring of the background
    const main=document.getElementsByTagName("main")[0];
    const r=Math.floor(Math.random()*256); //floor() si random() din Math
    const g=Math.floor(Math.random()*256);
    const b=Math.floor(Math.random()*256);
    main.style.backgroundColor=`rgba(${[r,g,b,0.25].join(',')})`; //join() din Array


    const form = document.querySelector('form');
    //event listener to load and save to localStorage
    form.addEventListener('input', saveFormData);
    form.addEventListener('change', saveFormData);
    loadFormData();

    //form submission
    const container = document.getElementById('container');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let validData=true;
        var formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
        if (formData.has('reason')) {
            if(formDataObj.reason===''){
                document.getElementById('error2').style.visibility = 'visible';
                validData=false;
            } else {
                document.getElementById('error2').style.visibility = 'hidden';
            }
        }
        if(formData.has('gender')){
            if(formDataObj.gender===''){
                document.getElementById('error').style.visibility = 'visible';
                validData=false;
            } else {
                document.getElementById('error').style.visibility = 'hidden';
            }
        }  
        if(formData.has('birthdate')){
            const inputDate=new Date(formDataObj.birthdate);
            if(inputDate.getYear()<=-100 || inputDate>(new Date())){ //getYear() din Datereturneaza numarul de ani de la 1900
                document.getElementById('error3').style.visibility = 'visible';
                validData=false;
            } else {
                document.getElementById('error3').style.visibility = 'hidden';
            }
        }  
        if(!validData){
            return;
        }

        const responseContainer = document.createElement('div'); 
        const image = document.createElement('img'); //create image for success
        image.classList.add("successImage");
        const h2 = document.createElement('h2');
        h2.textContent = 'MESSAGE SENT SUCCESSFULLY!';
        image.src = 'resources/gallery/image1.jpg';
        responseContainer.appendChild(image);
        responseContainer.appendChild(h2);
        responseContainer.setAttribute('id', 'response');
        container.replaceChild(responseContainer, form);
        document.getElementsByTagName('h3')[0].remove(); //deletes title
    });
}