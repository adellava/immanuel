import getClassNames from "./getClassNames";

describe("getClassNames", () => {
  test("getClassNames dovvrebbe tornare una stringa di classi css valida in base a un oggetto literal dove la chiave è il nome della classe e il valore descrive se la classe deve essere presente o meno", () => {
    const isEspanso = true;

    expect(
      getClassNames({
        menu: true,
        "menu--espanso": isEspanso,
        "menu--colorato": 3 < 1,
      })
    ).toBe("menu menu--espanso");
  });

  test("getClassNames dovvrebbe tornare una stringa di classi css valida in base a un array con tutte le classi da me desiderate", () => {
    expect(getClassNames(["menu", "menu--espanso"])).toBe("menu menu--espanso");
  });

  test("getClassNames dovvrebbe tornare una stringa di classi css valida in base a una stringa", () => {
    expect(getClassNames("menu menu--espanso")).toBe("menu menu--espanso");
  });

  test("getClassNames dovvrebbe tornare una stringa di classi css valida combinando vari metodi di espressione delle classi: stringa, array, classe literal", () => {
    expect(
      getClassNames("menu", ["menu--espanso"], {
        "menu--colorato": false,
      })
    ).toBe("menu menu--espanso");
  });
});
