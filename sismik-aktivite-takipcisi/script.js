$(document).ready(function () {

$.ajax({
    url: "https://deprem.afad.gov.tr/EventData/GetEventsByFilter",
    type: "POST",
    headers: {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.5",
      "cache-control": "no-cache, no-store, must-revalidate",
      "content-type": "application/json",
      "strict-transport-security": "max-age=16070400; includeSubDomains",
      "x-content-type-options": "nosniff",
      "x-frame-options": "deny",
      "x-xss-protectio": "1; mode=block"
    },
    data: JSON.stringify({
      "EventSearchFilterList": [
        { "FilterType": 9, "Value": new Date().toISOString() },
        { "FilterType": 8, "Value": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() }
      ],
      "Skip": 0,
      "Take": 15,
      "SortDescriptor": { "field": "eventDate", "dir": "desc" }
    }),
    dataType: "json",
    success: function(response) {
      eventList = response.eventList;
      eventList.forEach(function(event) {
        table  = $('table');
        // More readable date
        const utcTime = new Date(event.eventDate);
        const istanbulTime = new Date(utcTime.toLocaleString("en-US", {timeZone: "Europe/Istanbul"}));
        istanbulTime.setHours(istanbulTime.getHours() + 3);
        const formattedTime = `<b>${("0" + istanbulTime.getHours()).slice(-2)}:${("0" + istanbulTime.getMinutes()).slice(-2)}</b><br>${("0" + (istanbulTime.getMonth() + 1)).slice(-2)}/${("0" + istanbulTime.getDate()).slice(-2)}/${istanbulTime.getFullYear()}`;        
        table.append(`
        <tr>
            <td>${formattedTime}</td>
            <td><b>${event.location}</b><br>${event.longitude}, ${event.latitude}</td>
            <td><b>${event.magnitude}</b></td>
            <td>${event.depth}</td>
        </tr>`);
    });
    },
    error: function(xhr, status, error) {
      console.error(error); // Handle errors here
    }
  });

toBeRevealed = $("th, b, strong");
toBeRevealed.css("opacity", "0");
toBeRevealed.css("position", "relative");
toBeRevealed.css("left", "-25px");
toBeRevealed.addClass("blurred");
  toBeRevealed.each(function (index) {
    $(this).removeClass("blurred").delay(500 * (index + 1)).animate({
        opacity: "1",
        left: "0px"
    });
  })
  
});
