make userChat in such a way that  it consists all data of chats as well
it should have an arry of objects containing messages & its id should be 

abc - xyz in all formats whether a texts b or b texts a 
can do same by comparing user ids of a & b 
like: 
a < b (lower one stays to left )
& it should stay all like that.  

var sortIds = (sId, rId) => {
    let returnedId = "";
    if (sId < rId) {
        returnedId = sId + "-" + rId;
    } else if (rId < sId) {
        returnedId = rId + "-" + sId;
    }
    return returnedId;
}
undefined
sortIds("0TYlVQYUOkYcQuUIdfLCH5YAf0s2", "PudvExErzHfzOoN5cEINq81Essg2")
'0TYlVQYUOkYcQuUIdfLCH5YAf0s2-PudvExErzHfzOoN5cEINq81Essg2'
sortIds("PudvExErzHfzOoN5cEINq81Essg2", "0TYlVQYUOkYcQuUIdfLCH5YAf0s2")
'0TYlVQYUOkYcQuUIdfLCH5YAf0s2-PudvExErzHfzOoN5cEINq81Essg2'