export const idlFactory = ({ IDL }) => {
  const CaiModule = IDL.Record({
    'desc' : IDL.Text,
    'name' : IDL.Text,
    'parentModule' : IDL.Text,
    'isChild' : IDL.Bool,
  });
  const Time = IDL.Int;
  const CaiVersion = IDL.Record({
    'cName' : IDL.Text,
    'cTime' : Time,
    'cPid' : IDL.Text,
    'desc' : IDL.Text,
    'name' : IDL.Text,
    'size' : IDL.Nat,
    'uPid' : IDL.Text,
    'wasm' : IDL.Vec(IDL.Nat8),
    'uName' : IDL.Text,
    'uTime' : Time,
  });
  const Member = IDL.Record({
    'pid' : IDL.Text,
    'cTime' : Time,
    'cPid' : IDL.Text,
    'name' : IDL.Text,
  });
  return IDL.Service({
    'addAdmins' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'addCanister' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'addCanisterByAdmin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'addOrUpdateModule' : IDL.Func([CaiModule], [], []),
    'addVersion' : IDL.Func([IDL.Text, CaiVersion], [], []),
    'adminList' : IDL.Func([], [IDL.Vec(Member)], []),
    'canisters' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], []),
    'checkAdmin' : IDL.Func([], [IDL.Bool], []),
    'delCanister' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'delCanisterByAdmin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'delModule' : IDL.Func([IDL.Text], [], []),
    'initChilds' : IDL.Func([IDL.Text], [], []),
    'modules' : IDL.Func([], [IDL.Vec(CaiModule)], []),
    'setCaiDesc' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'setCaiTags' : IDL.Func([IDL.Text, IDL.Vec(IDL.Text)], [], []),
    'updateAllCais' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'updateTargetCais' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Text)],
        [IDL.Bool],
        [],
      ),
    'versions' : IDL.Func([IDL.Text], [IDL.Vec(CaiVersion)], []),
  });
};
export const init = ({ IDL }) => { return []; };
