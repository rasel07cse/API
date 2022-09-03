const loadPhone = async (searchText, datalimit) => {
      const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
      const res = await fetch(url);
      const data = await res.json();
      displayPhones(data.data, datalimit);
}


// Handle Search Button key 
document.getElementById('Searching-field').addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
            ProcessSearch(10);
      }
})

const displayPhones = (phones, datalimit) => {
      const phoneContainer = document.getElementById('phone-container');
      phoneContainer.textContent = '';
      // Display no phone founds 
      const noPhone = document.getElementById('no-phone-found');
      if (phones.length === 0) {
            noPhone.classList.remove('d-none');
      } else {
            noPhone.classList.add('d-none');
      }

      // Display only 10 phones  
      const showAll = document.getElementById('show-all');
      if (datalimit && phones.length > 10) {
            phones = phones.slice(0, 10);
            showAll.classList.remove('d-none');
      } else {
            showAll.classList.add('d-none');
      }

      // Button Show all 
      document.getElementById('show-all-btn').addEventListener('click', function () {
            ProcessSearch();
      })
      phones.forEach(phone => {
            const PhoneDiv = document.createElement('div');
            PhoneDiv.classList.add('col');
            PhoneDiv.innerHTML = `
                              <div class="card">
                                    <img src="${phone.image}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                          <h5 class="card-title">${phone.phone_name}</h5>
                                          <p class="card-text">${phone.slug}}</p>
                                          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#PhoneDetails">Show Details</button>
                                    </div>
                              </div>`;
            phoneContainer.appendChild(PhoneDiv);
      });
      // stop loading 
      toggleSpiner(false);
}

const loadPhoneDetails = async id => {
      const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      displayPhonesDetails(data.data);
}
const displayPhonesDetails = phone => {
      console.log(phone);
      const modalTitle = document.getElementById('PhoneDetailsLabel');
      modalTitle.innerText = phone.name;
      const PDetails = document.getElementById('modal-body');
      PDetails.innerHTML = `
            <p>Release Date: ${phone.releaseDate}</p>
            <img src="${phone.image}">
      `
}

const ProcessSearch = (datalimit) => {
      toggleSpiner(true);
      const SeacrhField = document.getElementById('Searching-field');
      const searchText = SeacrhField.value;
      loadPhone(searchText, datalimit);
}

document.getElementById('searchBtn').addEventListener('click', function () {
      // Start Loading 
      ProcessSearch(10)

})

const toggleSpiner = isLoading => {
      const loadingSection = document.getElementById('loader');
      if (isLoading) {
            loadingSection.classList.remove('d-none');
      } else {
            loadingSection.classList.add('d-none');
      }
}

// loadPhone();