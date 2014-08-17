function tipCalculator() {
    var baseMealCost = parseFloat(prompt("Enter base cost for the meal"));
    if(!isNaN(baseMealCost)) {
        var taxRate = parseFloat(prompt("Enter tax rate"));
        if(!isNaN(taxRate)) {
            var tipRate = parseFloat(prompt("Enter tip rate"));
            if(!isNaN(tipRate)) {
                var taxCost = (baseMealCost * taxRate / 100.0);
                var preTipCost = baseMealCost + taxCost;
                var tipCost = (preTipCost * tipRate / 100.0);
                var totalCost = baseMealCost + taxCost + tipCost;
                
                var result = "Base Meal Cost: " + baseMealCost + "\n" +
                             "Tax Cost: " + taxCost + "\n" +
                             "Tip Cost: " + tipCost + "\n" +
                             "Total Cost: " + totalCost + "\n";
            
                alert(result);
            }
            else {
                alert('Invalid value. Tip Rate should be a valid number.');
            }
        }
        else {
            alert('Invalid value. Tax Rate should be a valid number.');
        }
    }
    else {
        alert('Invalid value. Base Meal Cost should be a valid number.');
    }
}

window.onload = function() {
    tipCalculator();    
};