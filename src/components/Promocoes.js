import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FaTrash, FaEdit, FaShoppingCart } from 'react-icons/fa';

export default function Promocoes() {
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({ classificacao: '', nome: '', descricao: '', preco: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'preco') {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.classificacao && formData.nome && formData.descricao && formData.preco) {
      if (editingIndex !== null) {
        const updatedProdutos = [...produtos];
        updatedProdutos[editingIndex] = formData;
        setProdutos(updatedProdutos);
        setEditingIndex(null);
      } else {
        setProdutos([...produtos, formData]);
      }
      setFormData({ classificacao: '', nome: '', descricao: '', preco: '' });
    }
  };

  const handleDelete = (index) => {
    const novosProdutos = produtos.filter((_, i) => i !== index);
    setProdutos(novosProdutos);
  };

  const handleEdit = (index) => {
    setFormData(produtos[index]);
    setEditingIndex(index);
  };

  return (
    <div className="text-center" style={{ backgroundColor: '#fff', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#F73E91', padding: '15px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <FaShoppingCart size={30} style={{ color: '#fff' }} />
        <h2 style={{ color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.3)', margin: 0 }}>Wee pink</h2>
      </header>

      <h3 style={{
        color: '#000',
        margin: '20px auto',
        padding: '10px 20px',
        borderRadius: '8px',
        fontWeight: '500'
      }}>
        Meu Carrinho
      </h3>

      <Table bordered hover>
        <thead style={{ backgroundColor: '#FFB1D000', color: '#FFFF' }}>
          <tr>
            <th>ID</th>
            <th>Classificação</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>
              <Form.Control
                type="text"
                name="classificacao"
                placeholder="Classificação"
                value={formData.classificacao}
                onChange={handleChange}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                name="descricao"
                placeholder="Descrição"
                value={formData.descricao}
                onChange={handleChange}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                name="preco"
                placeholder="Preço"
                inputMode="decimal"
                value={formData.preco}
                onChange={handleChange}
              />
            </td>
            <td>
              <Button
                variant="light"
                onClick={handleSubmit}
                style={{ backgroundColor: '#FFB1D4', color: '#000' }}
              >
                {editingIndex !== null ? 'Salvar' : 'Adicionar'}
              </Button>
            </td>
          </tr>
          {produtos.map((produto, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{produto.classificacao}</td>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>R$ {Number(produto.preco).toFixed(2)}</td>
              <td>
                <Button
                  variant="link"
                  style={{ color: '#f443a4' }}
                  onClick={() => handleEdit(index)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="link"
                  style={{ color: 'red' }}
                  onClick={() => handleDelete(index)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <footer style={{ backgroundColor: '#F73E91', color: '#fff', padding: '10px', marginTop: 'auto' }}>
        <p style={{ margin: 0 }}>© 2025 Wee pink</p>
      </footer>
    </div>
  );
}
