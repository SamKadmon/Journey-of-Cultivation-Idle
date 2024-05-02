function convNum()
{
    var inputNum = document.getElementsByName("numDecimal")[0];
    var outputNum = document.getElementsByName("outputNum")[0];
    //-+-//
    console.log(inputNum.value);
    outputNum.innerHTML = toBinary(inputNum.value);
}
function getRange()
{
    return document.getElementsByName("numRange")[0].value;
}
function toBinary(num)
{
    var binaryNum = "";
    var condition = (num >= 0 && num < Math.pow(2,getRange()));
    for(var i = getRange()-1; i >= 0; i--)
    {
        //if number - 2^i > 0,add 1 else add 0
        if(condition)
        {
            // return "VALID";
            if(num - Math.pow(2,i) >= 0)
            {
                num-= Math.pow(2,i);
                binaryNum += 1;
            }
            else
            {
                binaryNum += 0;
            }
        }
        else
        {
            return "Not in range, or not number";
        }
    }  
    if(!condition)
    {
        return "Not in range, or not number";
    }
    return binaryNum;
}