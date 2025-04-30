import React, { useState } from 'react';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { FaTrash, FaEdit, FaShoppingCart } from 'react-icons/fa';

export default function Promocoes() {
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({ nome: '', descricao: '', preco: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'preco') {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.nome && formData.descricao && formData.preco) {
      if (editingIndex !== null) {
        const updatedProdutos = [...produtos];
        updatedProdutos[editingIndex] = formData;
        setProdutos(updatedProdutos);
        setEditingIndex(null);
      } else {
        setProdutos([...produtos, formData]);
      }
      setFormData({ nome: '', descricao: '', preco: '' });
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
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header className="text-center" style={{ backgroundColor: '#F73E91', padding: '15px 0' }}>
        <FaShoppingCart size={30} style={{ color: '#fff' }} />
        <h2 style={{ color: '#fff', margin: 0 }}>Wee pink</h2>
      </header>

      <Container fluid className="py-4 flex-grow-1">
        <Row className="justify-content-center mb-3">
          <Col xs="auto">
            <h3 className="text-center text-wrap" style={{ color: '#f443a4', fontWeight: '500' }}>
              Meu Carrinho
            </h3>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div style={{ overflowX: 'auto' }}>
              <Table bordered responsive hover>
                <thead style={{ backgroundColor: '#FFB1D4', color: '#000' }}>
                  <tr>
                    <th>ID</th>
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
                      <td>{produto.nome}</td>
                      <td>{produto.descricao}</td>
                      <td>R$ {produto.preco}</td>
                      <td>
                        <Button
                          variant="link"
                          style={{ color: '#f443a4' }}
                          onClick={() => (editingIndex === index ? handleSubmit() : handleEdit(index))}
                        >
                          {editingIndex === index ? 'Salvar' : <FaEdit />}
                        </Button>
                        <Button variant="link" style={{ color: 'red' }} onClick={() => handleDelete(index)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="text-center mt-auto" style={{ backgroundColor: '#F73E91', color: '#fff', padding: '10px' }}>
        <p style={{ margin: 0 }}>© 2025 Wee pink</p>
      </footer>
    </div>
  );
}
