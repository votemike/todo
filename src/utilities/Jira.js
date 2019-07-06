import CsvParse from 'csv-parse';

class Jira {
    static handleCsvUpload(event, newItems, setNewItems) {
        const file = event.target.files[0];
        const parser = CsvParse({delimiter: ',', columns: true, trim: true});
        let newJiraItems = [];
        parser.on('readable', function(){
            let record;
            // eslint-disable-next-line no-cond-assign
            while (record = parser.read()) {
                newJiraItems.push({ text: `${record['Issue key']} ${record['Summary']}`});
            }
        });
        const reader = new FileReader();
        reader.onload = (function() {
            return function(e) {
                parser.write(e.target.result);
                parser.end();
                setNewItems([...newItems, ...newJiraItems]);
            };
        })(file);

        reader.readAsText(file);
    }
}

export default Jira
