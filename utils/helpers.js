export const cleanupElements = (tabela) => {
  document.getElementsByClassName("embed-table-link")[0]?.remove();
  document.getElementsByClassName("embed-table-header")[0]?.remove();

  document.querySelectorAll('a[href^="https://sportdc.net/"]').forEach((a) => {
    a.removeAttribute("href");
  });

  if (tabela) {
    document.getElementsByClassName("embed-table-tabs clearfix")[0]?.remove();
    document.querySelectorAll('a[href^="/game/"]').forEach((a) => {
      a.removeAttribute("href");
    });
  }
};
