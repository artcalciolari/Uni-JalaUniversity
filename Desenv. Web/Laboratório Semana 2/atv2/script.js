document.addEventListener('DOMContentLoaded', () => 
{
  const form = document.getElementById('contact-form');
  const confirmationMessage = document.getElementById('confirmation-message');
    
  // Expressão regular para validação de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (formData) => 
  {
    let isValid = true;
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');

    // Validação do campo 'Nome'
    if (!formData.nome.trim()) 
    {
      displayError('nome', 'Por favor, insira seu nome.');
      isValid = false;
    }

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(formData.nome))
    {
      displayError('nome', 'O nome deve conter apenas letras e espaços.');
      isValid = false;
    }

    // Validação do campo 'E-mail'
    if (!formData.email.trim() || !emailRegex.test(formData.email)) 
    {
      displayError('email', 'Por favor, insira um e-mail válido.');
      isValid = false;
    }

    // Validação do campo 'Mensagem'
    if (!formData.mensagem.trim())
    {
      displayError('mensagem', 'Por favor, insira uma mensagem.');
      isValid = false;
    }
    return isValid;
  };

  const displayError = (fieldId, message) => 
  {
    const field = document.getElementById(fieldId);
    const errorSpan = field.nextElementSibling; // Pega o span de erro
    if (errorSpan && errorSpan.classList.contains('error-message')) 
    {
      errorSpan.textContent = message;
    }
  };

  form.addEventListener('submit', (event) => 
  {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados do formulário
    const formData = {
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value,
      contatoPreferido: form.querySelector('input[name="contato"]:checked').value,
      newsletter: form.newsletter.checked,
      mensagem: form.mensagem.value,
      dataEnvio: new Date().toISOString(), // Adiciona um timestamp
    };

    // Valida os dados
    if (validateForm(formData)) 
    {
      // Converte o objeto para uma string JSON
      const jsonData = JSON.stringify(formData);
            
      // Salva a string JSON no localStorage
      localStorage.setItem('dadosFormulario', jsonData);

      // Exibe a mensagem de confirmação
      confirmationMessage.classList.remove('hidden');
            
      // Limpa o formulário após 3 segundos
      setTimeout(() => 
      {
        form.reset();
        confirmationMessage.classList.add('hidden');
      }, 3000);
    }
  });
});