import { z } from 'zod';

const validaDigitosCPF = (str: string): boolean => {
  const cpf = str.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const calc = (base: string, fatores: number[]) => {
    const soma = base
      .split('')
      .reduce((acc, d, i) => acc + Number(d) * fatores[i], 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const base1 = cpf.slice(0, 9);
  const dig1 = calc(base1, [10,9,8,7,6,5,4,3,2]);
  const base2 = base1 + dig1;
  const dig2 = calc(base2, [11,10,9,8,7,6,5,4,3,2]);

  return cpf === base1 + String(dig1) + String(dig2);
};

export const IDBUserSchema = z.object({
  cep: z
    .string()
    .regex(/^\d{8}$/, 'CEP deve ter 8 dígitos sem formatação'),
  cpf: z
    .string()
    .length(11, 'CPF deve ter exatamente 11 dígitos')
    .refine(validaDigitosCPF, { message: 'CPF inválido' }),
  data_nascimento: z
    .string()
    .refine((s) => !Number.isNaN(Date.parse(s)), {
      message: 'Data de nascimento deve estar no formato YYYY-MM-DD',
    }),
  especificacoes_acessorio: z.any(),
  especificacoes_veiculo: z.any(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  numero_casa: z
    .number()
    .int('Número da casa deve ser inteiro')
    .nonnegative('Número da casa não pode ser negativo'),
  score: z
    .number()
    .min(0, 'Score não pode ser negativo')
    .max(1000, 'Score muito alto'),
  status: z.boolean(),
  telefone: z
    .string()
    .regex(/^\+?\d{10,15}$/, 'Telefone deve ter entre 10 e 15 dígitos, podendo começar com +'),
  tipo_usuario: z
    .number()
    .int('Tipo de usuário deve ser inteiro')
    .nonnegative('Tipo de usuário não pode ser negativo'),
});
