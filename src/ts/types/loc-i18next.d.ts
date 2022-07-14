declare module 'loc-i18next' {
  import i18nextValue, { TOptions } from 'i18next';

  type I18Next = typeof i18nextValue;

  type LocI18NextOptions = Partial<{
    selectorAttr: string;
    targetAttr: string;
    optionsAttr: string;
    useOptionsAttr: boolean;
    parseDefaultValueFromContent: boolean;
    document: Document;
  }>;

  function init(
    i18next: I18Next,
    options?: LocI18NextOptions,
  ): (selector: string, opts?: TOptions) => void;
}
