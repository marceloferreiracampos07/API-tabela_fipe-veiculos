const botao = document.getElementById("Buscarfipe")
const input = document.getElementById("inputFipe")
const resultado = document.getElementById("resultadoDados")

botao.addEventListener('click', Buscarfipe) 

async function Buscarfipe() {
    const codigo = input.value.trim()
if (codigo.length === 0) {
 resultado.innerHTML = '<p style="color: orange;"> Digite o código FIPE antes de buscar.</p>';
     return; 
  }
 resultado.innerHTML = 'Buscando dados na Tabela FIPE... ⏳';


     try {


    const jj = await fetch(`https://brasilapi.com.br/api/fipe/preco/v1/${codigo}`)
    if (!jj.ok) {

 throw new Error(`Erro de rede ou FIPE code inválido! Status: ${jj.status}`);
}

    const data = await jj.json() 
     if (data && data.length > 0) {
 const dadosCarro = data[0]; 


 resultado.innerHTML = `
         <h3> Detalhes FIPE</h3>
        <p><strong>Modelo:</strong> ${dadosCarro.modelo}</p>
         <p><strong>Marca:</strong> ${dadosCarro.marca}</p>
         <p><strong>Ano:</strong> ${dadosCarro.anoModelo}</p>
        <p><strong>Preço Médio:</strong> <strong>${dadosCarro.valor}</strong></p>
 `;

} else {


    resultado.innerHTML = '<p style="color: orange;">Nenhum preço encontrado para o código FIPE digitado.</p>';
}
 
     } catch (error) {
        console.error(`Erro na busca: ${error}`);
        
        resultado.innerHTML = `<p style="color: red;"> Erro: ${error.message}. Verifique o código FIPE.</p>`;
 }

}