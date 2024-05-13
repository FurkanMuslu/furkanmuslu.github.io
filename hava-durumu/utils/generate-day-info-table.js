let generateDayInfoTable = (rainExpected, showersExpected, snowfallExpected) => `
<table class="daily-day-info">
                <thead>
                    <tr>
                        <th><i class="material-icons icon" style="font-size:16px;">schedule</i>Saat</th>
                        <th><i class="material-icons icon" style="font-size:16px;">cloud</i>Hadise</th>
                        <th><i class="material-icons icon" style="font-size:16px;">device_thermostat</i>Sıcaklık</th>
                        ${
                          rainExpected
                            ? '<th><i class="material-icons icon" style="font-size:16px;">water_drop</i>Yağmur</th>'
                            : ""
                        }
                        ${
                          showersExpected
                            ? '<th><i class="material-icons icon" style="font-size:16px;">thunderstorm</i>Sağanak</th>'
                            : ""
                        }
                        ${
                          snowfallExpected
                            ? '<th><i class="material-icons icon" style="font-size:16px;">ac_unit</i>Kar</th>'
                            : ""
                        }
                    </tr>
                </thead>
                <tbody></tbody>
            </table>`;