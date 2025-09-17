const Exceljs=require('exceljs');
const{test, expect}=require('@playwright/test');
async function writeExcelTest(searchText,replaceText,change,FilePath){
    
const workbook=new Exceljs.Workbook();
await workbook.xlsx.readFile(FilePath);
const workSheet=workbook.getWorksheet('Sheet1');
const output=await readExcel(workSheet,searchText);
const cell=workSheet.getCell(output.row,output.col+change.colChange);
cell.value=replaceText;
await workbook.xlsx.writeFile((FilePath));
}

async function readExcel(workSheet,searchText){
    let output={row:-1,col:-1};
    workSheet.eachRow((row,rowNumber)=>{
    row.eachCell((cell,colNumber)=>{
       if(cell.value==searchText){
        output.row=rowNumber;
        output.col=colNumber;
       };
   
})
})
return output;
}

test('Upoad Download Excel Validation',async ({page})=>{
    const updateValue='370';
    const textSearch='Mango';
await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
const downloadPromise=page.waitForEvent('download');
await page.getByRole("button",{name:'Download'}).click();
await downloadPromise;
//update mango price to 350
writeExcelTest('Mango',updateValue,{rowChange:0,colChange:2},"C:/Users/sreek/Downloads/download.xlsx");
await page.locator("#fileinput").setInputFiles("C:/Users/sreek/Downloads/download.xlsx");
const textLocator=page.getByText(textSearch);
const desiredRow=await page.getByRole('row').filter({has:textLocator});
await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue.toString());
});