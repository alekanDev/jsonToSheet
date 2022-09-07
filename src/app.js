const XLSX = require('xlsx')

const url = 'https://jsonplaceholder.typicode.com/comments'

let infoDown = []

fetch(url)
.then(resp => resp.json())
.then(data => {
    data.map(el => {
        const elemento = {
            'name': el.name, 
            'body': el.body, 
            'email': el.email 
        }
        infoDown.push(elemento)
    })
    convertJsoToExcel(infoDown)
})

const convertJsoToExcel = () => {
    const date = new Date()
    const workSheet= XLSX.utils.json_to_sheet(infoDown)
    const workBook=XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workBook, workSheet,'infoApi')
    XLSX.write(workBook,{bookType: 'xlsx', type:'buffer' })

    XLSX.write(workBook,{bookType:'xlsx', type:'binary'})
    XLSX.writeFile(workBook,`export_${date.toDateString()}.xlsx`)
}