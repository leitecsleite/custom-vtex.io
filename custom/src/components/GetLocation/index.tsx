import React, { useEffect, useRef, useState } from "react";
import IconSpinner from "../../assets/icon/spinner";
import { onlyNumber } from "../../utils/onlyNymber";

import "./styles.css";
import { getAddress } from "../../utils/getAddress";

type DataLocation = {
  bairro: string;
  cep: string;
  complemento: string;
  localidade: string;
  logradouro: string;
  uf: string;
};

export default function GetLocation() {
  const [cepLocation, setCepLocation] = useState<string>();
  const [dataLocation, setDataLocation] = useState<DataLocation>();
  const [messageError, setMessageError] = useState<boolean>(false);
  const [dataError, setDataError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputZipCode = useRef<HTMLInputElement>(null);
  const inputStreet = useRef<HTMLInputElement>(null);
  const inputNeighborhood = useRef<HTMLInputElement>(null);
  const inputCity = useRef<HTMLInputElement>(null);
  const inputStateUf = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function changeData() {
      setTimeout(() => {
        if (
          !inputStreet.current ||
          !inputNeighborhood.current ||
          !inputCity.current ||
          !inputStateUf.current ||
          !inputZipCode.current
        )
          return;
        if (!dataLocation) return null;

        setLoading(false);

        const { bairro, cep, localidade, logradouro, uf } = dataLocation;

        if (!bairro || !cep || !localidade || !logradouro || !uf) {
          setDataError(true);
          return null;
        }

        setDataError(false);

        inputStreet.current.value = logradouro;
        inputNeighborhood.current.value = bairro;
        inputCity.current.value = localidade;
        inputStateUf.current.value = uf;
        inputZipCode.current.value = cep;
      }, 1000);
    }
    cleanInput();
    changeData();
  }, [dataLocation]);

  const handleChange = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = currentTarget;

    if (!inputZipCode.current) return;

    inputZipCode.current.value = onlyNumber(value);

    let cepValid: string = inputZipCode.current.value;

    const cep = cepValid;
    setCepLocation(cep);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (cepLocation?.length === 8) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const data = await getAddress(cepLocation);
      setDataLocation(data);
      setMessageError(false);
    } else {
      setMessageError(true);
      setLoading(false);
      setDataError(false);
      cleanInput();
    }
  };

  const cleanInput = () => {
    if (
      !inputStreet.current ||
      !inputNeighborhood.current ||
      !inputCity.current ||
      !inputStateUf.current ||
      !inputZipCode.current
    )
      return;
    inputStreet.current.value = "";
    inputNeighborhood.current.value = "";
    inputCity.current.value = "";
    inputStateUf.current.value = "";
  };

  return (
    <>
      <div className="container">
        <div className="container-header">
          <h3 className="painel-title"> Busque o Endereço </h3>
        </div>

        <div className="getLocation-painel-body">
          <form onSubmit={handleSubmit} className="for-location">
            <div>
              <label htmlFor="cep" className="getLocation-form-label">
                CEP
              </label>
            </div>

            <div className="getLocation-form-container-input">
              <input
                type="text"
                id="cep"
                ref={inputZipCode}
                name="cep"
                placeholder="XXXXXXXX"
                maxLength={8}
                onChange={handleChange}
                className="getLocation-input"
              />

              <button type="submit" className="getLocation-form-btn">
                {!loading ? (
                  "Consultar"
                ) : (
                  <IconSpinner className="getLocation-form-spinner" />
                )}
              </button>
            </div>

            <div className="getLocation-form-messageError">
              {!messageError ? (
                <></>
              ) : (
                <p className="getLocation-form-messageError-valueCep">
                  Error: Digite um CEP válido no formato XXXXXXXX.
                </p>
              )}
              {!dataError ? (
                <></>
              ) : (
                <p className="getLocation-form-messageError-valueCep">
                  Error: 404 Não encontrado o CEP digitado.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cep" className="getLocation-form-label">
                Rua:
              </label>
            </div>

            <div className="getLocation-form-container-input-disabled">
              <input
                type="text"
                disabled
                id="cep"
                name="cep"
                ref={inputStreet}
                onChange={handleChange}
                className="getLocation-input"
              />
            </div>

            <div>
              <label htmlFor="cep" className="getLocation-form-label">
                Bairro:
              </label>
            </div>

            <div className="getLocation-form-container-input-disabled">
              <input
                type="text"
                disabled
                id="cep"
                name="cep"
                ref={inputNeighborhood}
                maxLength={9}
                onChange={handleChange}
                className="getLocation-input"
              />
            </div>

            <div>
              <label htmlFor="cep" className="getLocation-form-label">
                Localidade:
              </label>
            </div>

            <div className="getLocation-form-container-input-disabled">
              <input
                type="text"
                disabled
                id="cep"
                name="cep"
                ref={inputCity}
                maxLength={9}
                onChange={handleChange}
                className="getLocation-input"
              />
            </div>

            <div>
              <label htmlFor="cep" className="getLocation-form-label">
                UF:
              </label>
            </div>

            <div className="getLocation-form-container-input-disabled">
              <input
                type="text"
                disabled
                id="cep"
                name="cep"
                ref={inputStateUf}
                maxLength={9}
                onChange={handleChange}
                className="getLocation-input"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
