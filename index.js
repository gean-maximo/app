const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de agua por dia',
    checked: false, 
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input ({message: "Digite a meta:"})

    if(meta.length == 0) {
        console.log('A meta nao pode ser vazia.')
        return 
    }

    metas.push(
        { value: meta, checked: false }
    )

} 

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false, 
    }) 

        metas.forEach((m) => {
            m.checked = false 
        })


    if(respostas.length == 0) {
        console.log("nenhuma meta selecionada!")
        return 
    }


    
    respostas.forEach((respostas) => {
        const meta = metas.find((m) => {
            return m.value == respostas 
        })

        meta.checked = true 
    } ) 

    console.log('Meta(s) marcadas como concluida(s)')
} 

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log('Não existem metas realizadas! :(')
        return 
    }

    await select ({
        message: "Metas Realizadas: " + realizadas.length, 
        choices: [...realizadas]
    })
}
const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true  
    })

    if (abertas.length == 0) {
        console.log("Não existem metas abertas! :)")
        return
    }

    await select({
        message:"Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return  { value: meta.value, checked: false } 
        
    })
    const itemsADeletar = await checkbox({
        message: "Selecione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false, 
    }) 

    if (itemsADeletar.length == 0) {
        console.log("Nenhum item para deletar!")
        return 
    }

    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item

        })
    })

    console.log("meta(s) deletada(s) com sucesso!")
}

const start = async () => {

    

    while(true){

        const opcao = await select({message: "menu >",
            choices: [
                {
                    name: "cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "listar metas",
                    value: "listar",
                },
                {
                    name: "metas realizadas",
                    value: "realizadas",
                },
                {
                    name: "metas abertas",
                    value: "abertas",
                },
                {
                    name: "Deletar metas",
                    value: "deletar",
                },
                {
                    name:"Sair",
                    value:"sair"
                }
            ]
        })
        


        
        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()    
                break
            case "abertas":
                await metasAbertas()    
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("ate a proxima")
                return

        }



    }

        
        
}

start()

