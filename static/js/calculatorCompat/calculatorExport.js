import { compileHand } from "./urlGen.js";

const calculatorTab = {
    name: 'Balatro Calculator',
    render: (ctx) => {
        const { dataDiv, data } = ctx;

        let url;
        try {
            url = compileHand(data);
        } catch(e) {
            dataDiv.innerText = 'Error processing save data: ' + e.message;
            return;
        }

        const label = document.createElement('label');
        label.textContent = 'URL: ';
        dataDiv.appendChild(label);
        const a = document.createElement('a');
        a.href = url;
        a.textContent = url;
        a.target = '_blank';
        dataDiv.appendChild(a);
    }
}

export {
    calculatorTab,
}