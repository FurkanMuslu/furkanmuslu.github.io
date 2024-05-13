function decodeWeatherCode(numerical_code) {
    let weather_code;
    switch (numerical_code) {
        case 0:
            weather_code = "Açık hava";
            break;
        case 1:
            weather_code = "Çoğunlukla açık";
            break
        case 2:
            weather_code = "Parçalı bulutlu";
            break;
        case 3:
            weather_code = "Kapalı hava";
            break;
        case 45:
        case 48:
            weather_code = "Sisli"
            break;
        case 48:
            weather_code = "Kırağı sisi"
            break;
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            weather_code = "Çiseleme"
            break;
        case 61:
            weather_code = "Hafif yağmur"
            break;
        case 63:
            weather_code = "Yağmur"
            break;
        case 65:
            weather_code = "Güçlü yağmur"
            break;
        case 66:
            weather_code = "Hafif dondurucu yağmur"
            break;
        case 67:
            weather_code = "Güçlü dondurucu yağmur"
            break;
        case 71:
            weather_code = "Hafif kar"
            break;
        case 73:
            weather_code = "Kar"
            break;
        case 75:
            weather_code = "Güçlü kar"
            break;
        case 77:
            weather_code = "İnce kar"
            break;
        case 80:
            weather_code = "Hafif sağanak"
            break;
        case 81:
            weather_code = "Orta sağanak"
            break;
        case 82:
            weather_code = "Güçlü sağanak"
            break;
        case 85:
            weather_code = "Hafif sağanak kar"
            break;
        case 86:
            weather_code = "Güçlü sağanak kar"
            break;
        case 95:
            weather_code = "Fırtına"
            break;
        case 96:
            weather_code = "Küçük dolu"
            break;
        case 99:
            weather_code = "Büyük dolu"
            break;
        
        default:
            weather_code = `${data.hourly.weather_code[i]}: ?`;
            break;
        
    }

    let importantCodes = [57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99];
    if (importantCodes.includes(numerical_code)) {
        weather_code = `<b class="important-weather">${weather_code}</b>`;
    }
    return weather_code;
}