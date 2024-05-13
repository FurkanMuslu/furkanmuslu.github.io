$(document).ready(function () {

  function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  }

  let lat = getUrlParameter("lat");
  let lon = getUrlParameter("lon");
  let name = getUrlParameter("name");
  if (lat == false || lon === false || name === false) {
    lat = 41.1382;
    lon = 27.9191;
    window.location.href =
      window.location.href.split("?")[0] +
      "?lat=" +
      lat +
      "&lon=" +
      lon +
      "&name=" +
      encodeURIComponent("Tekirdağ");
  }

  getWeatherData(lat, lon).then((data) => {
    let lastDate = "";
    let tableCounter = 0;
    
    for (let i = 0; i < data.hourly.time.length; i++) {
    
      let timeSplitted = data.hourly.time[i].split("T");
      let date = timeSplitted[0];
      let time = timeSplitted[1].split("+")[0];

      let isZero = (value) => value == 0;
      let rainExpected = !data.hourly.rain.every(isZero);
      let showersExpected = !data.hourly.showers.every(isZero);
      let snowfallExpected = !data.hourly.snowfall.every(isZero);

      if (date != lastDate) {
        lastDate = date;
        tableCounter++;
        $("#day-tables").append(generateDayInfoTable(rainExpected, showersExpected, snowfallExpected));

        $("#daily-day-selector").append(`<div>${date.split("-")[2]}</div>`);
        $("#daily-day-selector div").click(function () {
          allTables = $("#day-tables table");
          allSelectors = $("#daily-day-selector div");

          selectedTableIndex = $(this).index();
          selectedTable = allTables.eq(selectedTableIndex);

          allTables.hide();
          selectedTable.show();

          selectedSelector = allSelectors.eq(selectedTableIndex);
          allSelectors.removeClass("selected-day");
          selectedSelector.addClass("selected-day");
        });
      }

      let weather_code = decodeWeatherCode(data.hourly.weather_code[i]);

      let rain = data.hourly.rain[i].toString();
      if (data.hourly.rain[i] > 0) {
        rain = "<b class='important-weather'>" + rain + "mm</b>";
      }
      else {
        rain = "";
      }
      let showers = data.hourly.showers[i].toString();
      if (data.hourly.showers[i] > 0) {
        showers = "<b class='important-weather'>" + showers + "mm</b>";
      }
      else {
        showers = "";
      }
      let snowfall = data.hourly.snowfall[i].toString();
      if (data.hourly.snowfall[i] > 0) {
        snowfall = "<b class='important-weather'>" + snowfall + "mm</b>";
      }
      else {
        snowfall = "";
      }

      // highlight if current hour
      let isCurrentHour = parseInt(time.split(":")[0]) == new Date().getHours();
      isCurrentHour = isCurrentHour && tableCounter == 1;
      $("#day-tables table:last-child tbody").append(`<tr>
                <td ${isCurrentHour ? "id='current-hour'" : ""}>${time}</td>
                <td>${weather_code}</td>
                <td>${data.hourly.temperature_2m[i]}</td>
                ${rainExpected ? "<td>" + rain + "</td>" : ""}
                ${showersExpected ? "<td>" + showers + "</td>" : ""}
                ${snowfallExpected ? "<td>" + snowfall + "</td>" : ""}
                
            </tr>`);
    }

    $("#day-tables table").hide();
    $("#day-tables table").eq(0).show();
    $("#daily-day-selector div").eq(0).addClass("selected-day");
  });

  $("#search-result").hide();
  $("#search-place").submit(function (event) {
    $("#search-result").show();
    event.preventDefault();
    let placeName = $("#search-place input").first().val();
    getPlaceData(placeName).then((data) => {
      console.log(data);
      $("#search-result").empty();
      for (let i = 0; i < data.results.length; i++) {
        $("#search-result").append(`<div>${data.results[i].name}</div>`);
      }
      $("#search-result div").click(function () {
        let selectedID = $(this).index();
        let currentUrl = window.location.href;
        let params =
          "lat=" +
          data.results[selectedID].latitude +
          "&lon=" +
          data.results[selectedID].longitude +
          "&name=" +
          encodeURIComponent(data.results[selectedID].name);
        let newUrl = currentUrl.split("?")[0] + "?" + params;
        window.location.href = newUrl;
      });
    });
  });

  $("#current-place").append(getUrlParameter("name"));
  
  


});
