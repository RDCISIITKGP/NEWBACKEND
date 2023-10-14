import XLSX from "xlsx"
import { Readable } from "stream"

const createWorkbook = async ({ jsonData }: { jsonData: any[] }) => {
    const workbook = XLSX.utils.book_new()

    // Convert the JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData)

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")

    var out = XLSX.write(workbook, { bookType: "xlsx", type: "binary" })

    const workbookBuffer = Buffer.from(out, "binary")

    const workbookReadable = Readable.from(workbookBuffer)

    return workbookReadable
}

export default createWorkbook
