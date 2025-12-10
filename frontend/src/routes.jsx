<Routes>

  {/* ROTAS DE AUTENTICAÇÃO */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* ROTAS DO PARTICIPANTE */}
  <Route path="/" element={<ParticipanteHome />} />
  <Route path="/perfil" element={<Perfil />} />
  <Route path="/inscrever" element={<InscreverEvento />} />
  <Route path="/mensagens" element={<Mensagens />} />
  <Route path="/avaliar" element={<AvaliarEvento />} />

</Routes>
