import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Conta from "./Conta";

describe("Componente Conta", () => {
  it("Exibir o saldo da conta com valor monetário", () => {
    render(<Conta saldo={1000} />);
    const saldo = screen.getByTestId("saldo-conta");
    expect(saldo.textContent).toBe("R$ 1000");
  });
  it("Chama a função de realizar transação quando o botão é clicado", () => {
    const funcaoRealizarTransacao = jest.fn();
    render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />);

    fireEvent.click(screen.getByLabelText("Depósito"));
    fireEvent.change(screen.getByTestId("valor"), { target: { value: 100 } });

    fireEvent.click(screen.getByText("Realizar operação"));
    expect(funcaoRealizarTransacao).toHaveBeenCalled();
  });
  it("Clica no botão desabilitado e a função não vai ser chamada", () => {
    const funcaoRealizarTransacao = jest.fn();
    render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />);
    fireEvent.click(screen.getByText("Realizar operação"));
    expect(funcaoRealizarTransacao).not.toHaveBeenCalled();
  });
});
