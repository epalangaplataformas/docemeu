import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata um valor monetário em Kwanza (AOA) com proteção para números longos.
 * - Até 999.999: formatação completa com separadores de milhar (ex: "123.456 Kz").
 * - Entre 1 milhão e 999 milhões: exibe "X,X M Kz" (ex: "1,5 M Kz").
 * - Acima de 1 bilhão: exibe "X,X B Kz" (ex: "2,3 B Kz").
 * Sempre retorna string compacta que não quebra layout.
 */
export function formatCurrency(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num) || num < 0) return "0 EUR";

  if (num < 1_000_000) {
    // Abaixo de 1 milhão: formatação normal
    return num.toLocaleString("pt-PT", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) + " EUR";
  }

  if (num < 1_000_000_000) {
    // Milhões: abrevia com uma casa decimal
    const millions = num / 1_000_000;
    const formatted = millions.toLocaleString("pt-PT", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return formatted + " M EUR";
  }

  // Bilhões ou mais: abrevia com uma casa decimal
  const billions = num / 1_000_000_000;
  const formatted = billions.toLocaleString("pt-PT", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return formatted + " B EUR";
}

/**
 * Formata uma data ISO para o padrão português de Angola.
 * Exemplo: 2026-07-16T22:59:41Z → "16/07/2026, 23:59"
 */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso;
  return date.toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formata uma duração relativa (há X minutos/horas/dias).
 */
export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "agora mesmo";
  if (diffMin < 60) return `há ${diffMin} minuto${diffMin > 1 ? "s" : ""}`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `há ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
  const diffDays = Math.floor(diffHours / 24);
  return `há ${diffDays} dia${diffDays > 1 ? "s" : ""}`;
}

