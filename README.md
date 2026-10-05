# Companhia Fitness — site + gestão

Projeto React/Vite conectado ao Supabase da Companhia Fitness.

## O que já existe

- Site institucional moderno nas cores laranja, preto e branco.
- Hero/banner interativo, animações e layout responsivo.
- Página pública de agendamento de avaliação física.
- Horários disponíveis carregados do Supabase.
- Ao reservar, o horário fica ocupado para novos agendamentos.
- Área administrativa com autenticação.
- Painel com visão geral, avaliações, alunos e horários.
- Cadastro de alunos.
- Criação, ativação e desativação de horários.
- Alteração de status de avaliações (agendada, concluída, cancelada, faltou).
- RLS no Supabase para separar acesso público e administrativo.

## Executar localmente

```bash
npm install
npm run dev
```

## Primeiro acesso administrativo

1. Abra `#/admin` no site.
2. Clique em **Primeiro acesso? Criar conta**.
3. Crie a conta e, se a confirmação de e-mail estiver ativa no Supabase, confirme o e-mail.
4. Faça login.
5. A primeira conta autenticada poderá ativar o primeiro administrador. Depois disso, esse bootstrap fica bloqueado pelo banco.

## Stack

- React
- Vite
- Supabase Database + Auth + RLS
- CSS próprio
- Lucide Icons
