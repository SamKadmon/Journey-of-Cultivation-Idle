var unlocked_bar = [0, 0, 0];
var progress_bar_percent = [0, 0, 0];
var unlock_cost = [0, 20, 50];

$(document).on('click', '.upgrade', function () {
    var id = parseInt($(this).attr("id"));
    console.log(unlock_cost[id] + " <= " + progress_bar_percent[id - 1]);
    if (unlock_cost[id] <= progress_bar_percent[id - 1] && id != 0) {
        progress_bar_percent[id - 1] -= unlock_cost[id];
        $(this).prop('disabled', true);
        $(this).text("Purchased");
        unlocked_bar[id] = 1;
        console.log(unlocked_bar);
    }
    else if (id == 0) {
        $(this).prop('disabled', true);
        $(this).text("Purchased");
        unlocked_bar[id] = 1;
        console.log(unlocked_bar);
    }
});


setInterval(
    function () {
        var count = 0;
        unlocked_bar.forEach(bar => {
            if (parseInt(bar)) {
                if (progress_bar_percent[count] < 100) {
                    progress_bar_percent[count]++;
                    // console.log("#bar" + count);
                    console.log(count);
                    $(".bar" + (count+1)).attr("value", progress_bar_percent[count]);
                }
            }
            count++;
        });
    },
    100
)