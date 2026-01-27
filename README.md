# SN Brasil Contábil — Site Institucional

Site institucional moderno e responsivo da **SN Brasil Contábil**, desenvolvido com foco em performance, clareza e experiência do usuário.

O projeto conta com animações suaves, tela splash exibida uma única vez por sessão, FAQ em modal, formulário de contato com envio real de e-mails via SMTP e navegação fluida entre seções.

---

## Tecnologias utilizadas

- Next.js (App Router)
- TypeScript
- Tailwind CSS v3
- Framer Motion
- Nodemailer (SMTP)
- Brevo (SMTP relay)

---

## Requisitos para rodar o projeto

- Node.js 18 ou superior
- NPM

---

## Como rodar o projeto localmente

**Execute todos os comandos abaixo em sequência**:

``` bash
git clone https://github.com/BrunoBrasilJr/SN-Brasil.git
cd SN-Brasil    
npm install
npm run dev
```

**Após isso, acesse no navegador:**
http://localhost:3000

Se quiser testar no celular, use o IP exibido no terminal (exemplo: http://192.168.x.x:3000).

Envio de e-mails (Formulário de Contato)
O formulário de contato envia e-mails reais via SMTP utilizando Nodemailer.

## As variáveis importantes são:
```bash
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
MAIL_FROM (remetente)
MAIL_TO (destinatário)
```
Durante testes, é possível usar o próprio e-mail como destinatário.
Em produção, recomenda-se usar o e-mail oficial da empresa.

## Scripts disponíveis
```bash
npm run dev      # desenvolvimento
npm run build    # build de produção
npm run start    # rodar build
```

## Observações importantes
A tela splash aparece apenas uma vez por sessão.
O modal de FAQ possui animações de entrada e saída, além de bloqueio de scroll.
A navegação do footer e da navbar faz scroll suave entre seções.
O estado de scroll é preservado ao atualizar a página (F5).

## Licença
Projeto institucional — uso autorizado apenas pela SN Brasil Contábil.