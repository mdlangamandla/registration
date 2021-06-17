
var regList=[];
var testFilter = regNumFilter();
describe('Testing the Registration Number factory functions' , ()=>{
    it('Should convert an input string to an array.' , ()=>{
        var str = 'ca 342 234'
        assert.deepEqual(testFilter.inputToList(str),['CA 342 234']);
        str = 'ca 324456,cy345123,cf139057'
        assert.deepEqual(testFilter.inputToList(str),['CA 324 456','CY 345 123','CF 139 057']);
        
    });

    
    it('Should check if a registration is valid.' , ()=>{
        var str= 'CA 345 973'
        assert.equal(testFilter.validityTest('tenten'), false);
        assert.equal(testFilter.validityTest('CX 345 973'), false);
    });

    it('Should check if a registration is not a duplicate.' , ()=>{
        var str= 'CA 345 973'
        assert.equal(testFilter.validityTest('CAM 123 456'), false);
    });


     it('Should add spaces to registration numbers that are valid but have    missing spaces in between.' ,()=>{
        var str = 'CA345247'
        assert.equal(testFilter.spaceCheck(str),'CA 345 247');
     
    });

    it('Should change all registration numbers first letters to Uppercase.' , ()=>{
        var str = 'ca 342 234'
        assert.deepEqual(testFilter.inputToList(str),['CA 342 234']);
        str = 'ca 324456,cy345123,cf139057'
        assert.deepEqual(testFilter.inputToList(str),['CA 324 456','CY 345 123','CF 139 057']);
        
    });
});

