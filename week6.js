let data;

const list = document.querySelector(".ticketCard-area"); //因為這個區塊常常要被重畫，因此把他抓出來全域讓函式們可以用

//init代表的是拿到陣列之後用init畫上去的函式
function init() {
  let str1 = "";
  data.forEach(function (item) {
    str1 += `
      <li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src="${item.imgUrl}" alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
          </div>
        </div>
      </li>`;
  }); //src記得用雙引號
  list.innerHTML = `${str1}`;
}

//這是"搜尋地區按鈕監聽器"的註冊 也是用locaFilter函式來包起來
function locaFilter() {
  const locationFilter = document.querySelector(".regionSearch");
  locationFilter.addEventListener("click", function (e) {
    let str2 = "";
    data.forEach(function (item) {
      if (e.target.value == item.area) {
        str2 += `<li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src="${item.imgUrl}" alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
          </div>
        </div>
      </li>`;
        list.innerHTML = str2;
      }
      if (e.target.value === "全部地區") {
        str2 += `<li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src="${item.imgUrl}" alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
          </div>
        </div>
      </li>`;
        list.innerHTML = str2;
      }
    });
  });
}


//把"新增套票表單的填寫資料"整理起來並寫進data這個陣列的過程 包成 "renderData"函式
function renderData() {
  const newAddBtn = document.querySelector(".newAddBtn");
  const ticketName = document.querySelector(".ticketName");
  const ticketImgUrl = document.querySelector(".pictureUrl");
  const ticketRegion = document.querySelector(".area");
  const ticketPrice = document.querySelector(".ticketPrice");
  const ticketNum = document.querySelector(".ticketNum");
  const ticketRate = document.querySelector(".ticketRate");
  const ticketDescription = document.querySelector(".ticketDescription");

  const numberReminder = document.querySelector(".descriptionOfNum");
  numberReminder.textContent = `本次搜尋共 ${data.length} 筆資料`; //這裡我不知道怎麼抓li的個數來顯示搜尋後的資料筆數，故先寫這樣子
  newAddBtn.addEventListener("click", function (e) {
    let obj = {};
    obj.name = ticketName.value;
    obj.imgUrl = ticketImgUrl.value;
    obj.area = ticketRegion.value;
    obj.description = ticketDescription.value;
    obj.group = ticketNum.value;
    obj.price = ticketPrice.value;
    obj.rate = ticketRate.value;
    data.push(obj);
    init();
  });
}



axios
  .get(
    "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json"
  )
  .then(function (response) {
    data = response.data.data;
    init();
    locaFilter();
    renderData();
    //太乾淨了，這段axios程式碼實在是太乾淨了
  });