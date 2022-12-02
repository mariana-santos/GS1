let itens = ['nome', 'email', 'dtNasc', 'regisCNH', 'validCNH', 'uploadCNH', 'senha', 'Confirmsenha'];
        
        function validacaoFormulario (e) {

            let valido = true;

            //passa por todos os inputs e caso algum seja inválido, não envia o formulário
            itens.forEach((input) => {
                item = document.getElementById(input)
                erro = document.querySelector(`.erro_${input}`)

                if ((estaVazio(item, erro)) || (input == 'dtNasc' && validarIdade(item, erro)) 
                || (input == 'validCNH' && validarCNH(item, erro)) || (input == 'senha' && validarSenha(item, erro))) {
                    e.preventDefault();
                    valido = false
                }
            })
            // e.preventDefault()
            if(valido) alert('Usuário cadastrado com sucesso!')
            
        }

        function estaVazio(item, erro){
            if(item.value.length == 0) {
                erro.style.display = "inline-block"
                return true 
             } else { 
                erro.style.display = "none"
                return false
             }
        }

        function validarIdade (data, erro) {
            data = data.value.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
            var data_array = data.split("-"); // quebra a data em array
            
            // para o IE onde será inserido no formato dd/MM/yyyy
            if(data_array[0].length != 4){
                data = data_array[2]+"-"+data_array[1]+"-"+data_array[0]; // remonto a data no formato yyyy/MM/dd
            }
            
            // comparo as datas e calculo a idade
            var hoje = new Date();
            var nasc  = new Date(data);
            var idade = hoje.getFullYear() - nasc.getFullYear();
            var m = hoje.getMonth() - nasc.getMonth();
            if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
            
            if(idade < 18 || idade > 150){
                erro.style.display = "inline-block"
                erro.textContent = "Você precisa digitar uma idade válida!"
                return true 
            }else {
                erro.style.display = "none"
                return false
            }
        }

        function validarCNH (data, erro) {
            data = data.value.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
            var data_array = data.split("-"); // quebra a data em array
            
            // para o IE onde será inserido no formato dd/MM/yyyy
            if(data_array[0].length != 4){
                data = data_array[2]+"-"+data_array[1]+"-"+data_array[0]; // remonto a data no formato yyyy/MM/dd
            }

            var hoje = new Date() 
            var val  = new Date(data);
            val.setDate(val.getDate() + 1);

            if (val <= hoje){
                erro.style.display = "inline-block"
                erro.textContent = 'Sua CNH está vencida!'
                return true 
            } else {
                erro.style.display = "none"
                return false
            }
        }

        function validarSenha (senhaDigitada, erro) {
            var letrasMaiusculas = /[A-Z]/;
            var letrasMinusculas = /[a-z]/; 
            var numeros = /[0-9]/;
            var caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

            confirmSenha = document.querySelector('#cofirmSenha').value
            erro_confirm = document.querySelector('.erro_cofirmSenha')

            if (!letrasMaiusculas.test(senhaDigitada.value) || !letrasMinusculas.test(senhaDigitada.value) || !numeros.test(senhaDigitada.value) || !caracteresEspeciais.test(senhaDigitada.value || senhaDigitada.value.length < 8)){
                erro.style.display = "inline-block"
                return true
            } else if(senhaDigitada.value !== confirmSenha){
                erro_confirm.style.display = "inline-block"
                erro.style.display = "inline-block"
                erro.textContent = "Senhas não correspondem!"
                return true
            }else {
                erro_confirm.style.display = "none"
                erro.style.display = "none"
                return false
            }
        }